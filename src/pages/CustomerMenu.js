import React from 'react'
import { useSelector } from 'react-redux';
import CustomerProtected from '../components/CustomerProtected';
import axios from 'axios';
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from 'react-bootstrap';
import '../UI/Button.css';
import CustomerNavBar from '../UI/CustomerNavBar';
import { useDispatch } from 'react-redux';
import { CustomerActions } from '../store/CustomerSlice';
import './CustomerMenu.css';

const CustomerMenu = () => {
    const [prods, setProds] = useState([]);
    const [items, setItems] = useState();
    var already_items = JSON.parse(localStorage.getItem('cart'))
    if (already_items == null) {
        already_items = []
    }
    const [cart, setCart] = useState(already_items);
    const dispatch = useDispatch()

    const id = useSelector(state => state.customer.shop) || localStorage.getItem('shop_id')

    useEffect(() => {
        var count = 0
        for (const element of cart) {
            if (element) {
                count++;
            }
        }
        setItems(count);
    }, [cart])

    const addToCart = (id, name, price, total_quan) => {
        const obj = { id, name, price }
        const cart = JSON.parse(localStorage.getItem('cart'))
        var count = 0
        for (const element of cart) {
            if (element.id === id) {
                count = count + 1;
            }
        }
        if (count < total_quan) {
            setCart((prevCart) => [...prevCart, obj])
        }
        else {
            window.alert('quantity exceeded')
        }
    }

    const removeFromCart = (id) => {
        var temp = [...cart];
        const index = temp.findIndex(obj => { return obj.id === id })
        if (index >= 0) {
            temp.splice(index, 1)
            setCart([...temp])

        }
    }

    async function getProds() {
        try {
            const res = await axios.get(`http://localhost:3000/api/shopProd/${id}`, {
                withCredentials: true,
            });
            const data = res.data.shopProd;
            return data;

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const findProds = async () => {
            const data = await getProds();
            setProds(data);
        }
        findProds();
    }, [prods])

    useEffect(() => {
        dispatch(CustomerActions.cartUpdate(cart))
    }, [cart])

    // return (
    //     <CustomerProtected>
    //         <CustomerNavBar />
    //         <TableContainer component={Paper}>
    //             <Table>
    //                 <TableHead aria-label='simple table'>
    //                     <TableRow>
    //                         <TableCell>Name</TableCell>
    //                         <TableCell>Quan</TableCell>
    //                         <TableCell>Unit Price</TableCell>
    //                     </TableRow>
    //                 </TableHead>
    //                 <TableBody>
    //                     {prods && prods.map((prod) => (
    //                         <TableRow
    //                             key={prod._id} >
    //                             <TableCell>{prod.prod_name}</TableCell>
    //                             <TableCell>{prod.quan}</TableCell>
    //                             <TableCell>{prod.unit_price}</TableCell>
    //                             <div className="btn1">
    //                                 <div className="btn2">
    //                                     <Button variant="warning" onClick={() => { addToCart(prod._id, prod.prod_name, prod.unit_price, prod.quan) }}>Add</Button>
    //                                 </div>
    //                                 <div className="btn2">
    //                                     <Button variant="danger" onClick={() => { removeFromCart(prod._id) }}>Remove</Button>
    //                                 </div>
    //                             </div>
    //                         </TableRow>
    //                     ))
    //                     }
    //                 </TableBody>
    //             </Table>
    //         </TableContainer>
    //         <div>Total items: {items}</div>
    //     </CustomerProtected>
    // )
    return (
        <CustomerProtected>
            <CustomerNavBar />
            <div className='table-container'>
                <Table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Total Quantity</th>
                            <th>Unit Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prods && prods.map((prod) => (
                            <tr key={prod._id}>
                                <td>{prod.prod_name}</td>
                                <td>{prod.quan}</td>
                                <td>${prod.unit_price}</td>
                                <td>
                                    <div className="btn-group">
                                        <button className="btn btn-primary" onClick={() => { addToCart(prod._id, prod.prod_name, prod.unit_price, prod.quan) }}>Add</button>
                                        <button className="btn btn-danger" onClick={() => { removeFromCart(prod._id) }}>Remove</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="cart-total">Quantity In Cart:<span>{items}</span></div>
        </CustomerProtected>
    )


}

export default CustomerMenu
