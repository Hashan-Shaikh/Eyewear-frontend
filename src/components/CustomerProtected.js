import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthenticateCustomer } from "../store/CustomerSlice";
import { useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
const CustomerProtected = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthenticateCustomer());
    }, [dispatch]);
    const isLoggedIn = useSelector(state => state.customer.isLoggedIn);
    const isLoading = useSelector(state => state.customer.isLoading);

    if (!isLoggedIn && !isLoading) {
        return <Navigate to="/customer" replace />
    }
    if (isLoggedIn && !isLoading) {
        return props.children;
    }
    if (!isLoggedIn && isLoading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }
}

export default CustomerProtected;