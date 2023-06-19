import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from '../actionTypes/cartActionTypes';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from '../actionTypes/fetchActionTypes';

export type initState = {
  loading: boolean;
  products: [];
  error: string;
};

const initialState = {
  loading: false,
  products: [],
  error: '',
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: '',
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
        error: action.payload,
      };
    case ADD_TO_CART: {
      const updatedItems = state.products.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: 1,
          };
        }
        return item;
      });
      return {
        ...state,
        products: updatedItems,
      };
    }
    case REMOVE_FROM_CART: {
      const updatedItems = state.products.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: 0,
          };
        }
        return item;
      });
      return {
        ...state,
        products: updatedItems,
      };
    }
    case INCREASE_QUANTITY: {
      const updatedItems = state.products.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      return {
        ...state,
        products: updatedItems,
      };
    }

    case DECREASE_QUANTITY: {
      const updatedItems = state.products.map(item => {
        if (item.id === action.payload && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
      return {
        ...state,
        products: updatedItems,
      };
    }
    default:
      return state;
  }
};
