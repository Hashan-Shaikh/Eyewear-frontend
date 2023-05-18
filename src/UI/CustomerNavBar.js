import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CustomerActions } from '../store/CustomerSlice';
import { BsFillCartFill, BsSearch } from "react-icons/bs";
import '../UI/NavBar.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';


function CustomerNavBar() {
    const isLoggedIn = useSelector(state => state.customer.isLoggedIn);
    const history = useNavigate();
    const dispatch = useDispatch();
    const [customer, setCustomer] = useState('')
    const logoutHandler = async () => {
        const res = await axios.post('http://localhost:3000/api/customer/logout', {
            withCredentials: true
        });
        if (res.status === 200) {
            dispatch(CustomerActions.logout());
            // setCustomer()
            history('/home');
            window.alert("successfull logout");
        }
    }
    const cartHandler = () => {
        history('/customer/checkout')
    }


    async function getCustomer() {
        try {
            const customer_id = localStorage.getItem('customer_id')
            if (customer_id != null) {
                const res = await axios.get(`http://localhost:3000/api/customer/${customer_id}`, {
                    withCredentials: true
                });
                const customer = res.data.customer
                return customer;
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        const findCustomer = async () => {
            const customer = await getCustomer();
            setCustomer(customer);
        }
        findCustomer();
    }, [])


    return (
        <>
            <div className='AnnouncementContainer'>
                Super Offers. Shop for frames now!
            </div>
            <div className='Container'>
                <div className='Wrapper'>
                    <div className='Left'>
                        <span className='Language'>EN</span>
                        <div className='SearchContainer'>
                            <input></input>
                            <BsSearch />
                        </div>
                    </div>
                    <div className='Center'>
                        <h1 className='logo'>EyeWear.pk</h1>
                    </div>
                    <div className='Right'>
                        <div>{customer && customer.map(c => {
                            return (
                                <div key={c._id}>wallet: ${c.wallet}</div>
                            )
                        })}</div>
                        {!isLoggedIn && <div className='MenuItem'><Link to='/home'>Home</Link></div>}
                        {isLoggedIn && <div className='MenuItem'><Link to='/customer' onClick={logoutHandler}>LogOut</Link></div>}
                        <div className='MenuItem'>
                            <BsFillCartFill onClick={cartHandler} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerNavBar;