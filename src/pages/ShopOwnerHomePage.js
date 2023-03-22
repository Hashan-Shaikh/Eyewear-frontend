import Slider from "../UI/Slider";
//import ShopNavBar from "../UI/ShopNavBar";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from '../assets/pic1.jpg';
// import logo2 from '../assets/pic2.jpg';
// import logo3 from '../assets/pic3.jpg';
//import styles from '../utils/CardSpacing.module.css';
import axios from "axios";
import './AdminHomePage.css';
import ShopProtected from "../components/ShopProtected";
//import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ShopNavBar from "../UI/ShopNavBar";

axios.defaults.withCredentials = true;

const ShopOwnerHomePage = () => {
    const history = useNavigate();
    const viewShopHandler = () => {
        history('/shop-owner/view-store');
    }
    const addProdHandler = () => {
        history('/shop-owner/add-prod');
    }

    return (<ShopProtected>
        <ShopNavBar />
        <Slider />
        <Card style={{ display: 'flex', flexDirection: 'row', margin: '50px' }}>
            <Card style={{ width: '18rem', padding: '30px' }}>
                <Card.Img variant="top" src={logo} />
                <Card.Body>
                    <Card.Title>View Store</Card.Title>
                    <Card.Text>
                        Add Frames to your shops, for more customer choice!
                    </Card.Text>
                    <Button variant="primary" onClick={viewShopHandler}>View</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem', padding: '30px' }}>
                <Card.Img variant="top" src={logo} />
                <Card.Body>
                    <Card.Title>Add Products</Card.Title>
                    <Card.Text>
                        Add Frames to your shops, for more customer choice!
                    </Card.Text>
                    <Button variant="primary" onClick={addProdHandler}>Add</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem', padding: '30px' }}>
                <Card.Img variant="top" src={logo} />
                <Card.Body>
                    <Card.Title>Update Products</Card.Title>
                    <Card.Text>
                        Update Frames to your shops!
                    </Card.Text>
                    <Button variant="primary">Update</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem', padding: '30px' }}>
                <Card.Img variant="top" src={logo} />
                <Card.Body>
                    <Card.Title>Delete Products</Card.Title>
                    <Card.Text>
                        Delete Frames to your shops!
                    </Card.Text>
                    <Button variant="primary">Delete</Button>
                </Card.Body>
            </Card>
        </Card>
    </ShopProtected>)
}
export default ShopOwnerHomePage;
