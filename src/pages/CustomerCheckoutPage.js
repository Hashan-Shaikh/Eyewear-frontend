import React from 'react'
import CustomerProtected from '../components/CustomerProtected'
import { useSelector } from 'react-redux'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomerNavBar from '../UI/CustomerNavBar';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './CustomerCheckoutPage.css'


const CustomerCheckoutPage = () => {
    var cart = JSON.parse(localStorage.getItem('cart'))
    const [price, setPrice] = useState(0)
    const cust_id = localStorage.getItem('customer_id');
    const shop_id = localStorage.getItem('shop_id');
    const [address, setAddress] = useState('')
    const history = useNavigate()
    var temp = 0

    async function getCustomer() {
        try {
            const res = await axios.get(`http://localhost:3000/api/customer/${cust_id}`, {
                withCredentials: true,
            });
            const data = res.data.customer.address;
            return data;

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        temp = 0
        cart.forEach(element => {
            temp = temp + Number(element.price)
        }
        );
        setPrice(temp);
    }, [price, cart])

    useEffect(() => {
        const findCustomer = async () => {
            const data = await getCustomer();
            setAddress(data);
        }
        findCustomer();
    }, [])

    const confirmOrder = async (e) => {
        e.preventDefault();
        try {
            const res = await axios
                .post("http://localhost:3000/api/order", {
                    cart: cart,
                    address: address,
                    shop_id: shop_id,
                    customer_id: cust_id
                });
            const msg = res.data.message;
            window.alert(msg);
            localStorage.setItem('cart', JSON.stringify([]));
            history('/customer/home');

        }
        catch (err) {
            window.alert(err);
            history('/customer/home');
        }
    }

    // return (
    //     <CustomerProtected>
    //         <CustomerNavBar />
    //         <TableContainer component={Paper}>
    //             <Table>
    //                 <TableHead aria-label='simple table'>
    //                     <TableRow>
    //                         <TableCell>Name</TableCell>
    //                         <TableCell>Unit Price</TableCell>
    //                     </TableRow>
    //                 </TableHead>
    //                 <TableBody>
    //                     {cart && cart.map((c) => (
    //                         <TableRow
    //                             key={c.id} >
    //                             <TableCell>{c.name}</TableCell>
    //                             <TableCell>{c.price}</TableCell>
    //                         </TableRow>
    //                     ))
    //                     }
    //                 </TableBody>
    //             </Table>
    //         </TableContainer>
    //         <div className="price">Total ${price}</div>
    //         <Form className='form-style' onSubmit={confirmOrder}>
    //             <Form.Group className="mb-3" controlId="formBasicEmail">
    //                 <Form.Label className='form-label'>Delivery Address</Form.Label>
    //                 <Form.Control type="text" placeholder="Enter address" value={address}
    //                     onChange={(e) => setAddress(e.target.value)} />
    //             </Form.Group>
    //             <Button variant="primary" type="submit">
    //                 Confirm order
    //             </Button>
    //         </Form>
    //     </CustomerProtected>
    // )
    return (
        <CustomerProtected>
            <CustomerNavBar />
            <div className='table-container'>
                <Table className='table'>
                    <thead aria-label='simple table'>
                        <tr>
                            <th className="table-header">Name</th>
                            <th className="table-header">Unit Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart && cart.map((c) => (
                            <tr key={c.id} className="table-row">
                                <td>{c.name}</td>
                                <td>${c.price.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="price">Total: ${price.toFixed(2)}</div>
            <Form className='form-style' onSubmit={confirmOrder}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='form-label'>Delivery Address</Form.Label>
                    <Form.Control className="form-control" type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </Form.Group>
                <Button className="confirm-btn" variant="primary" type="submit">Confirm order</Button>
            </Form>
        </CustomerProtected>
    )

}
export default CustomerCheckoutPage;