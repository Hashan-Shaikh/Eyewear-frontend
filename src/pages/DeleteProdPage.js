import ShopProtected from "../components/ShopProtected";
import React from 'react'
//import ShopProtected from "../components/ShopProtected";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import { useState } from "react";
//import AdminNavBar from "../UI/AdminNavBar";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DeleteProdPage = () => {
    const [prodName, setProd] = useState('');
    const history = useNavigate();
    const deleteProd = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.delete(`http://localhost:3000/api/shopProd/${prodName}`);
            const data = res.data;
            window.alert(data.message);
            history('/shop-owner/home');
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <ShopProtected>
            <Form onSubmit={deleteProd}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Product name</Form.Label>
                    <Form.Control type="n" placeholder="n" value={prodName}
                        onChange={(n) => setProd(n.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    DeleteProd
                </Button>
            </Form>
        </ShopProtected>
    )
}

export default DeleteProdPage
