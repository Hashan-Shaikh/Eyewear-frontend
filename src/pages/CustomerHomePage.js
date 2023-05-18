import React from 'react'
import CustomerProtected from '../components/CustomerProtected';
import CustomerNavBar from '../UI/CustomerNavBar';
import { useEffect, useState } from "react";
import axios from "axios";
import Card from '../UI/Card';

const CustomerHomePage = () => {
    const [shops, setShops] = useState();
    async function getshops() {
        try {
            const res = await axios.get("http://localhost:3000/api/shop/", {
                withCredentials: true,
            });
            const data = res.data.shops;
            return data;

        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const findshops = async () => {
            const data = await getshops();
            setShops(data);
        }
        findshops();
    }, [])
    return (
        <CustomerProtected>
            <CustomerNavBar />
            {(!shops) && <div>No shops registered!</div>}
            {(shops) && shops.map((shop) => (
                <Card key={shop._id} name={shop.name} location={shop.location} id={shop._id} />
            )
            )}

        </CustomerProtected>
    )
}

export default CustomerHomePage
