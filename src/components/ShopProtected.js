import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthenticateShop } from "../store/ShopSlice";
import { useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
const ShopProtected = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthenticateShop());
    }, [dispatch]);

    const isLoggedIn = useSelector(state => state.shop.isLoggedIn);
    const isLoading = useSelector(state => state.shop.isLoading);

    if (!isLoggedIn && !isLoading) {
        return <Navigate to="/shop-owner" replace />
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

export default ShopProtected;