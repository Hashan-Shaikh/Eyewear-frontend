import React from 'react'
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ShopNavBar from '../UI/ShopNavBar';
import ShopProtected from '../components/ShopProtected';
import '../components/MuiTShopTable.css';

const ViewShopProdsPage = () => {
    const [shopProd, setShopProd] = useState();
    const _id = useSelector(state => state.shop._id);
    async function getProds() {
        try {
            const res = await axios.get(`http://localhost:3000/api/shopProd/${_id}`, {
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
            //console.log(data);
            setShopProd(data);
        }
        findProds();
    }, [])
    return (
        <ShopProtected>
            <ShopNavBar />
            <div className='table-container'>
                <Table className='table'>
                    <thead aria-label='simple table'>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Per Unit Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            shopProd && shopProd.map((prod) => (
                                <tr
                                    key={prod._id}>
                                    <td>{prod.prod_name}</td>
                                    <td>{prod.quan}</td>
                                    <td>{prod.unit_price}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </ShopProtected>
    )
}

export default ViewShopProdsPage
