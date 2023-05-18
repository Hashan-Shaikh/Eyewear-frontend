import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;

const initialCustomerState = { isLoggedIn: false, isLoading: true, _id: null, shop: null };

const CustomerSlice = createSlice({
    name: 'Customer',
    initialState: initialCustomerState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.isLoading = false;
            state._id = action.payload;
            localStorage.setItem('customer_id', action.payload)
        },
        logout(state) {
            state.isLoggedIn = false;
            state.isLoading = false;
            state._id = null;
            localStorage.removeItem('shop_id');
            localStorage.removeItem('cart');
            localStorage.removeItem('customer_id');
        },
        shopassigned(state, action) {
            localStorage.setItem('shop_id', action.payload);
            state.shop = action.payload;
        },
        cartUpdate(state, action) {
            localStorage.setItem('cart', JSON.stringify(action.payload));
            state.cart = action.payload;
        },

    }
});

const authenticateCustomer = () => {
    return async function (dispatch) {
        try {
            const res = await axios.get("http://localhost:3000/api/customer/refreshToken", {
                withCredentials: true
            });
            const data = res.data;
            dispatch(CustomerSlice.actions.login(data.customer._id));
        } catch (err) {
            dispatch(CustomerSlice.actions.logout());
        }
    }
}


export const CustomerActions = CustomerSlice.actions;
export const AuthenticateCustomer = authenticateCustomer;
export const CustomerReducer = CustomerSlice.reducer;