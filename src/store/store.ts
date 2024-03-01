import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { cartReducer } from '../reducers/cartReducers';

import { 
  orderCreateReducer, 
  orderDeliverReducer, 
  orderDetailsReducer, 
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from '../reducers/orderReducers';

import { 
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productUpdateReducer,
} from '../reducers/productReducers';

import {
  userDeleteReducer, 
  userDetailsReducer, 
  userListReducer, 
  userLoginReducer, 
  userRegisterReducer, 
  userUpdateProfileReducer, 
  userUpdateReducer
} from '../reducers/userReducers'

const rootReducer = combineReducers({
  cart: cartReducer,
  orders: combineReducers({
    create: orderCreateReducer,
    deliver: orderDeliverReducer,
    details: orderDetailsReducer,
    listMy: orderListMyReducer,
    list: orderListReducer,
    pay: orderPayReducer,
  }),
  products: combineReducers({
    create: productCreateReducer,
    delete: productDeleteReducer,
    details: productDetailsReducer,
    list: productListReducer,
    reviewCreate: productReviewCreateReducer,
    topRated: productTopRatedReducer,
    update: productUpdateReducer,
  }),
  users: combineReducers({
    delete: userDeleteReducer,
    details: userDetailsReducer,
    list: userListReducer,
    login: userLoginReducer,
    register: userRegisterReducer,
    updateProfile: userUpdateProfileReducer,
    update: userUpdateReducer,
  }),
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
 