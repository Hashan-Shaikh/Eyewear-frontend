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
import './AddProdToShopPage.css';
import ShopNavBar from "../UI/ShopNavBar";
const UpdateProdPage = () => {
    const [oldProd, setOldProd] = useState('');
    const [productName, setName] = useState('');
    const [quan, setQuan] = useState('');
    const [price, setPrice] = useState('');
    const history = useNavigate();
    const submitProd = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:3000/api/shopProd/${oldProd}`, {
                prod_name: productName,
                quan: quan,
                unit_price: price,
            });
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
            <ShopNavBar />
            <Form className="form-container-11" onSubmit={submitProd}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="form-label-11">Old Product name</Form.Label>
                    <Form.Control className="form-control-11" type="o" placeholder="o" value={oldProd}
                        onChange={(o) => setOldProd(o.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="form-label-11">Product name</Form.Label>
                    <Form.Control className="form-control-11" type="name" placeholder="name" value={productName}
                        onChange={(n) => setName(n.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="form-label-11">Quantity</Form.Label>
                    <Form.Control className="form-control-11" type="q" placeholder="quantity" value={quan}
                        onChange={(q) => setQuan(q.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="form-label-11">Per Unit Price</Form.Label>
                    <Form.Control className="form-control-11" type="p" placeholder="price" value={price}
                        onChange={(p) => setPrice(p.target.value)} />
                </Form.Group>

                <Button className="submit-btn-11" variant="primary" type="submit">
                    UpdateProd
                </Button>
            </Form>
        </ShopProtected>
    )
}

export default UpdateProdPage
