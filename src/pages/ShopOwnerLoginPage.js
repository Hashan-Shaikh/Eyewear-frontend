import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ShopActions } from '../store/ShopSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShopNavBar from "../UI/ShopNavBar";
import './AdminLoginPage.css';

function ShopOwnerLoginForm() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sendRequest = async (e) => {
        e.preventDefault();
        try {
            const res = await axios
                .post("http://localhost:3000/api/shop/sign-in", {
                    email: email,
                    password: password,
                });
            const data = res.data;
            window.alert("logged in successfully");
            dispatch(ShopActions.login(data.shop._id));
            history('/shop-owner/home');
        }
        catch (err) {
            window.alert("invalid-credentials");
            history('/shop-owner');
        }
    };

    return (<>
        <ShopNavBar />
        <Form className='form-style' onSubmit={sendRequest}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='form-label'>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='form-label'>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password}
                    onChange={(p) => setPassword(p.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    </>);
}

export default ShopOwnerLoginForm;