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
        <TableContainer component={Paper}>
            <Table>
                <TableHead aria-label='simple table'>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Per Unit Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        shopProd && shopProd.map((prod) => (
                            <TableRow
                                key={prod._id}>
                                <TableCell>{prod.prod_name}</TableCell>
                                <TableCell>{prod.quan}</TableCell>
                                <TableCell>{prod.unit_price}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ViewShopProdsPage
