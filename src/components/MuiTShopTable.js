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
import AdminProtected from './AdminProtected';
// import '../UI/Button.css';
import './MuiTShopTable.css'

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

    return (
        // <AdminProtected>
        //     <TableContainer component={Paper}>
        //         <Table>
        //             <thead aria-label='simple table'>
        //                 <th>Name</th>
        //                 <th>Location</th>
        //                 <th>Email</th>
        //             </thead>
        //             <tbody>
        //                 {
        //                     props.shops.map((shop) => (
        //                         <tr
        //                             key={shop._id}>
        //                             <td>{shop.name}</td>
        //                             <td>{shop.location}</td>
        //                             <td>{shop.email}</td>
        //                             <div className="btn1">
        //                                 <div className="btn2">
        //                                     <Button variant="warning" onClick={updateShopHandler}>Edit</Button>
        //                                 </div>
        //                                 <div className="btn2">
        //                                     <Button variant="danger" onClick={deleteShopHandler}>Delete</Button>
        //                                 </div>
        //                             </div>
        //                         </tr>
        //                     ))
        //                 }
        //             </tbody>
        //         </Table>
        //     </TableContainer>
        //     <Button className='btn3' variant='primary' onClick={addShopHandler}>Add Shop</Button>
        //</AdminProtected>
        <AdminProtected>
            <div className="table-container">
                <Table className="table">
                    <thead aria-label='simple table'>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.shops.map((shop) => (
                                <tr key={shop._id}>
                                    <td>{shop.name}</td>
                                    <td>{shop.location}</td>
                                    <td>{shop.email}</td>
                                    <td>
                                        <div className="btn-group">
                                            <button className="btn btn-warning" onClick={updateShopHandler}>Edit</button>
                                            <button className="btn btn-danger" onClick={deleteShopHandler}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            <button className="submit-btn-x" onClick={addShopHandler}>Add Shop</button>
        </AdminProtected>

    )
}


export default MuiShopTable
