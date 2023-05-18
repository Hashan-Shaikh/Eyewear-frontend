import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomerActions } from '../store/CustomerSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomerNavBar from "../UI/CustomerNavBar";
import './AdminLoginPage.css';

function CustomerLoginPage() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sendRequest = async (e) => {
        e.preventDefault();
        try {
            //debugger;
            const res = await axios
                .post("http://localhost:3000/api/customer/sign-in", {
                    email: email,
                    password: password,
                });
            const data = res.data;
            window.alert("logged in successfully");
            dispatch(CustomerActions.login(data.customer._id));
            history('/customer/home');

        }
        catch (err) {
            window.alert("invalid credentials!");
            history('/customer');
        }
    };

    return (<>
        <CustomerNavBar />
        <Form className='form-container-1' onSubmit={sendRequest}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='form-label-1'>Email address</Form.Label>
                <Form.Control className='form-control-1' type="email" placeholder="Enter email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='form-label-1'>Password</Form.Label>
                <Form.Control className='form-control-1' type="password" placeholder="Password" value={password}
                    onChange={(p) => setPassword(p.target.value)} />
            </Form.Group>
            <Button className='submit-btn-1' type="submit">
                Login
            </Button>
        </Form>
    </>);
}

export default CustomerLoginPage;
