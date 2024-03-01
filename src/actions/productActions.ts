import { Dispatch } from 'redux';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL
} from '../constants/productConstants'
 import axios from 'axios'
import { sampleProduct } from '../sample/sample';
import { RootState } from '../store/store';

export const listProducts = (keyword = "", pageNumber = "") => async (dispatch: Dispatch) => {
  try {
     dispatch({ type: PRODUCT_LIST_REQUEST });
 
     try {
       const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        dispatch({ 
          type: PRODUCT_LIST_SUCCESS,
          payload: data
      });    
     } catch (error: any) {
       dispatch({ 
           type: PRODUCT_LIST_FAIL,
           payload: error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message
       });
     }
  } catch (error: any) {
     dispatch({
         type: PRODUCT_LIST_FAIL,
         payload: error.response && error.response.data.message 
                  ? error.response.data.message 
                  : error.message
     });
  }
 }
 

// Product Details Action

export const listProductDetails = (id: number) => async (dispatch: Dispatch) =>{
    try {
       dispatch({ type : PRODUCT_DETAILS_REQUEST });
       
       const {data} = await axios.get(`/api/products/${id}`);
       
       dispatch({ 
           type: PRODUCT_DETAILS_SUCCESS,
           payload: data
       })
   
    } catch (error: any) {
        
       dispatch({
           type : PRODUCT_DETAILS_FAIL,
           payload : error.response && error.response.data.message 
           ? error.response.data.message : error.message
       })
    }
   
   }

   
  export const deleteProduct = ( id: number ) => async (dispatch: Dispatch, getState: RootState) => {
    try {
      dispatch({
        type: PRODUCT_DELETE_REQUEST,
      })
  
      const {
        userInfo: { userInfo },
      } = getState.users.login
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
       await axios.delete(`/api/products/${id}`,  config)
  
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
      })
    } catch (error: any) {       
   
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message ,
      })
    }
  }


  export const createProduct = ( ) => async (dispatch: Dispatch, getState:  RootState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      })
  
      const {
        userInfo: { userInfo },
      } = getState.users.login
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data}= await axios.post(`/api/products`, {},  config)
  
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload:data
      })
    } catch (error: any) {       
   
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message ,
      })
    }
  }




  
  export const updateProduct = ( product: any ) => async (dispatch: Dispatch, getState: RootState) => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
      })
  
      const {
        userInfo: { userInfo },
      } = getState.users.login
  
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data}= await axios.put(`/api/products/${product._id}` ,product,  config)
  
      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload:data
      })
    } catch (error: any) {       
   
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message ,
      })
    }
  }

  export const createProductReview = (productId: number, review: any) => async (
    dispatch: Dispatch, 
    getState: RootState
  ) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      })
  
      const {
        userInfo: { userInfo },
      } = getState.users.login
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.post(`/api/products/${productId}/reviews`, review, config)
  
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      })
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      // if (message === 'Not authorized, token failed') {
      //   dispatch(logout())
      // }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      })
    }
  }



  export const listTopProducts = () => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: PRODUCT_TOP_REQUEST })
  
      const { data } = await axios.get(`/api/products/top`);
  
      dispatch({
        type: PRODUCT_TOP_SUCCESS,
        payload: data,
      })
    } catch (error: any) {
      dispatch({
        type: PRODUCT_TOP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }