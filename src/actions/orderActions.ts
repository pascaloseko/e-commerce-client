import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../constants/orderConstants";
import { useAppDispatch, useAppSelector } from "../hooks/rootState";
import { UseDispatch } from "react-redux";
import { RootState } from "../store/store";

export const createOrder = (order: any) => async (dispatch: UseDispatch, getState: RootState) => {
    try {
        dispatch.apply({
          type: ORDER_DETAILS_REQUEST,
        });
    
        const {
          userInfo: { userInfo },
        } = getState.users.login;
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
    
        const { data } = await axios.get(`/api/orders/${order.id}`, config);
    
        dispatch.apply({
          type: ORDER_DETAILS_SUCCESS,
          payload: data,
        });
      } catch (error: any) {
        dispatch.apply({
          type: ORDER_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
}

export const getOrderDetails = (id: number) => async (dispatch: UseDispatch, getState: RootState) => {
    try {
      dispatch.apply({
        type: ORDER_DETAILS_REQUEST,
      });
  
      const {
        userInfo: { userInfo },
      } = getState.users.login;
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/orders/${id}`, config);
  
      dispatch.apply({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch.apply({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const payOrder =
    (orderId: any, paymentResult: any) => async (dispatch: UseDispatch, getState:  RootState) => {
      try {
        dispatch.apply({
          type: ORDER_PAY_REQUEST,
        });
  
        const {
          userInfo: { userInfo },
        } = getState.users.login;
  
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
  
        const { data } = await axios.put(
          `/api/orders/${orderId}/pay`,
          paymentResult,
          config
        );
  
        dispatch.apply({
          type: ORDER_PAY_SUCCESS,
          payload: data,
        });
      } catch (error: any) {
        dispatch.apply({
          type: ORDER_PAY_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  
    export const deliverOrder = (order: any) => async (dispatch: UseDispatch, getState: RootState) => {
      try {
        dispatch.apply({
          type: ORDER_DELIVER_REQUEST,
        })
    
        const {
          userInfo: { userInfo },
        } = getState.users.login
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
    
        const { data } = await axios.put(
          `/api/orders/${order._id}/deliver`,
          {},
          config
        )
    
        dispatch.apply({
          type: ORDER_DELIVER_SUCCESS,
          payload: data,
        })
      } catch (error: any) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch.apply({
          type: ORDER_DELIVER_FAIL,
          payload: message,
        })
      }
    }
  export const listMyOrders = () => async (dispatch: UseDispatch, getState: RootState) => {
    try {
      dispatch.apply({
        type: ORDER_LIST_MY_REQUEST,
      });
  
      const {
        userInfo: { userInfo },
      } = getState.users.login;
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/orders/myorders`, config);
  
      dispatch.apply({
        type: ORDER_LIST_MY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch.apply({
        type: ORDER_LIST_MY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const listOrders = () => async (dispatch: UseDispatch, getState: RootState) => {
    try {
      dispatch.apply({
        type: ORDER_LIST_REQUEST,
      });
  
      const {
        userInfo: { userInfo },
      } = getState.users.login;
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/orders`, config);
  
      dispatch.apply({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch.apply({
        type: ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };