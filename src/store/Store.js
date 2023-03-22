import { configureStore } from '@reduxjs/toolkit';
import { AdminReducer } from './AdminSlice';
import { ShopReducer } from './ShopSlice';

const redux = require('redux');
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;

const store = configureStore({ reducer: { admin: AdminReducer, shop: ShopReducer } }, applyMiddleware(thunkMiddleware));

export default store;