import {ADD_TO_CART, REMOVE_FROM_CART} from '../actionTypes/cartActionTypes';

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (!state.cart.includes(action.payload)) {
        return {
          // ...state,
          cart: [...state.cart, action.payload],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(data => data !== action.payload),
      };
    default:
      return state;
  }
};
