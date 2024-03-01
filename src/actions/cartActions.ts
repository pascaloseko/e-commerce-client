import axios from "axios";
import { CART_ADD_ITEM , CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";
import { useAppDispatch, useAppSelector } from "../hooks/rootState";
import { RootState } from "../store/store";
import { UseDispatch } from "react-redux";


export const addToCart = (id: string, qty: number) => async (dispatch: UseDispatch, getState: RootState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch.apply({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            },
    });

    localStorage.setItem('cartItems', JSON.stringify(getState));
}

export const removeFromCart = (id: number) => (dispatch: UseDispatch, getState: () => RootState) => {
    dispatch.apply({
        type: CART_REMOVE_ITEM,
        payload:id
    });

    localStorage.setItem('cartItems', JSON.stringify(getState));
}

export const saveShippingAddress = (data: any) => (dispatch: UseDispatch) => {
    dispatch.apply({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload:data
    });
}

export const savePaymentMethod = (data: any) => (dispatch: UseDispatch) => {
    dispatch.apply({
        type: CART_SAVE_PAYMENT_METHOD,
        payload:data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}