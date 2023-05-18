import React from 'react'
import './Card.css';
import img from '../assets/store.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CustomerActions } from '../store/CustomerSlice';

const Card = (props) => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const ViewStore = (key) => {
        dispatch(CustomerActions.shopassigned(key));
        history('/customer/shop');
    }
    return (
        <div className='card' onClick={() => {
            ViewStore(props.id);
        }}>
            <div className='imageCard'>
                <img src={img} className='img' />
            </div>
            <div>
                <div className='textCard'>{props.name}</div>
                <div className='textCard'>{props.location}</div>
            </div>
        </div>
    )
}

export default Card
