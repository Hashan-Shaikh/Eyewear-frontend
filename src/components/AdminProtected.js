import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthenticateAdmin } from "../store/AdminSlice";
import { useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
const AdminProtected = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthenticateAdmin());
    }, [dispatch]);
    const isLoggedIn = useSelector(state => state.admin.isLoggedIn);
    const isLoading = useSelector(state => state.admin.isLoading);

    if (!isLoggedIn && !isLoading) {
        return <Navigate to="/admin" replace />
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

export default AdminProtected;