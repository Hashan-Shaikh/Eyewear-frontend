import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials = true;

const initialAdminState = { isLoggedIn: false, isLoading: true, name: null };

const AdminSlice = createSlice({
    name: 'Admin',
    initialState: initialAdminState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.isLoading = false;
            state.name = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.isLoading = false;
            state.name = null;
        },
    }
});

const authenticateAdmin = () => {
    return async function (dispatch) {
        try {
            const res = await axios.get("http://localhost:3000/api/admin/refreshToken", {
                withCredentials: true
            });
            const data = res.data;
            dispatch(AdminSlice.actions.login(data.admin.name));
        } catch (err) {
            dispatch(AdminSlice.actions.logout());
        }
    }
}

export const AdminActions = AdminSlice.actions;
export const AuthenticateAdmin = authenticateAdmin;
export const AdminReducer = AdminSlice.reducer;