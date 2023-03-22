import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import '../UI/Button.css';

const MuiShopTable = (props) => {
    const history = useNavigate();

    const addShopHandler = (e) => {
        history('/admin/home/register-shop');
    }

    const updateShopHandler = (e) => {
        history('/admin/home/update-shop');
    }

    const deleteShopHandler = (e) => {
        history('/admin/home/delete-shop');
    }

    return (<>
        <TableContainer component={Paper}>
            <Table>
                <TableHead aria-label='simple table'>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.shops.map((shop) => (
                            <TableRow
                                key={shop._id}>
                                <TableCell>{shop.name}</TableCell>
                                <TableCell>{shop.location}</TableCell>
                                <TableCell>{shop.email}</TableCell>
                                <div className="btn1">
                                    <div className="btn2">
                                        <Button variant="warning" onClick={updateShopHandler}>Edit</Button>
                                    </div>
                                    <div className="btn2">
                                        <Button variant="danger" onClick={deleteShopHandler}>Delete</Button>
                                    </div>
                                </div>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        <Button className='btn3' variant='primary' onClick={addShopHandler}>Add Shop</Button>
    </>
    )
}

export default MuiShopTable
