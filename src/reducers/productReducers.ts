import { PayloadAction } from '@reduxjs/toolkit';
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
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL
  } from '../constants/productConstants';
  
  interface ProductListState {
    products?: [];
    loading?: boolean;
    error?: any;
    pages: number;
    page: number;
  }
  
  interface ProductDetailsState {
    product?: {details: any, reviews: [] };
    loading?: boolean;
    error?: any;
  }
  
  interface ProductDeleteState {
    loading?: boolean;
    success?: boolean;
    error?: any;
  }
  
  interface ProductCreateState {
    loading?: boolean;
    success?: boolean;
    product?: any;
    error?: any;
  }
  
  interface ProductUpdateState {
    product?: any;
    loading?: boolean;
    success?: boolean;
    error?: any;
  }
  
  interface ProductReviewCreateState {
    loading?: boolean;
    success?: boolean;
    error?: any;
  }
  
  interface ProductTopRatedState {
    products?: [];
    loading?: boolean;
    error?: any;
  }
  
  export const productListReducer = (
    state: ProductListState = {
      products: [],
      pages: 0,
      page: 0
    },
    action: any
  ): ProductListState => {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST:
        return { loading: true, ...state };
      case PRODUCT_LIST_SUCCESS:
        return {
          loading: false,
          products: action.payload.products,
          pages: action.payload.pages,
          page: action.payload.page
        };
      case PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload, page: 0, pages: 0 };
      default:
        return state;
    }
  };
  
  export const productDetailsReducer = (
    state: ProductDetailsState = { product: { details: {}, reviews: [] } },
    action: any
  ): ProductDetailsState => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return { loading: true, ...state };
      case PRODUCT_DETAILS_SUCCESS:
        return { loading: false, product: action.payload };
      case PRODUCT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const productDeleteReducer = (
    state: ProductDeleteState = {},
    action: any
  ): ProductDeleteState => {
    switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
        return { loading: true };
      case PRODUCT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case PRODUCT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const productCreateReducer = (
    state: ProductCreateState = {},
    action: any
  ): ProductCreateState => {
    switch (action.type) {
      case PRODUCT_CREATE_REQUEST:
        return { loading: true };
      case PRODUCT_CREATE_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const productUpdateReducer = (
    state: ProductUpdateState = { product: {} },
    action: any
  ): ProductUpdateState => {
    switch (action.type) {
      case PRODUCT_UPDATE_REQUEST:
        return { loading: true };
      case PRODUCT_UPDATE_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_UPDATE_RESET:
        return { product: {} };
      default:
        return state;
    }
  };
  
  export const productReviewCreateReducer = (
    state: ProductReviewCreateState = {},
    action: any
  ): ProductReviewCreateState => {
    switch (action.type) {
      case PRODUCT_CREATE_REVIEW_REQUEST:
        return { loading: true };
      case PRODUCT_CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true };
      case PRODUCT_CREATE_REVIEW_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_CREATE_REVIEW_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const productTopRatedReducer = (
    state: ProductTopRatedState = { products: [] },
    action: any
  ): ProductTopRatedState => {
    switch (action.type) {
      case PRODUCT_TOP_REQUEST:
        return { loading: true, products: [] };
      case PRODUCT_TOP_SUCCESS:
        return { loading: false, products: action.payload };
      case PRODUCT_TOP_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  