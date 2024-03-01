import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants';

interface CartState {
  itemsPrice?: string;
  shippingPrice?: string;
  taxPrice?: string;
  totalPrice?: string;
  cartItems: CartItem[];
  shippingAddress: any;
  paymentMethod?: string;
}

interface CartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

const initialState: CartState = {
  cartItems: [],
  shippingAddress: {},
};

export const cartReducer = (state: CartState = initialState, action: any): CartState => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload;
      const existingItem = state.cartItems.find((x) => x.product === newItem.product);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => (x.product === existingItem.product ? newItem : x)),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
