import React from 'react'
import ShopProtected from "../components/ShopProtected";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import { useState } from "react";
//import AdminNavBar from "../UI/AdminNavBar";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AddProdToShopePage = () => {
    const [shopId, setId] = useState(useSelector(state => state.shop._id));
    const [productName, setName] = useState('');
    const [quan, setQuan] = useState('');
    const [price, setPrice] = useState('');
    const history = useNavigate();
    const submitProd = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/shopProd/', {
                shop_id: shopId,
                product_name: productName,
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
            <Form onSubmit={submitProd}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Shop_id</Form.Label>
                    <Form.Control type="name" placeholder="name" value={shopId}
                        onChange={(s) => setId(s.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Product name</Form.Label>
                    <Form.Control type="name" placeholder="name" value={productName}
                        onChange={(n) => setName(n.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="q" placeholder="quantity" value={quan}
                        onChange={(q) => setQuan(q.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Per Unit Price</Form.Label>
                    <Form.Control type="p" placeholder="price" value={price}
                        onChange={(p) => setPrice(p.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    AddProd
                </Button>
            </Form>
        </ShopProtected>
    )
}

export default AddProdToShopePage
