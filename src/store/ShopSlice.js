import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;

const initialShopState = { isLoggedIn: false, isLoading: true, _id: null };

const ShopSlice = createSlice({
    name: 'Shop',
    initialState: initialShopState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.isLoading = false;
            state._id = action.payload;
            localStorage.setItem('shop_id', action.payload)
        },
        logout(state, action) {
            state.isLoggedIn = false;
            state.isLoading = false;
            state._id = null;
            localStorage.removeItem('shop_id', action.payload)
        },
    }
});

const authenticateShop = () => {
    return async function (dispatch) {
        try {
            const res = await axios.get("http://localhost:3000/api/shop/refreshToken", {
                withCredentials: true
            });
            const data = res.data;
            dispatch(ShopSlice.actions.login(data.shop._id));
        } catch (err) {
            dispatch(ShopSlice.actions.logout());
        }
    }
}

export const ShopActions = ShopSlice.actions;
export const AuthenticateShop = authenticateShop;
export const ShopReducer = ShopSlice.reducer;