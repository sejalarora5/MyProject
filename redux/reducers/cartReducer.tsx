// import {ADD_TO_CART, REMOVE_FROM_CART} from '../actionTypes/cartActionTypes';

import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from '../actionTypes/cartActionTypes';

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (!state.cart.some(data => data.id === action.payload.id)) {
        return {
          ...state,
          cart: [...state.cart, {...action.payload, quantity: 1}],
        };
      }
      return state;
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(data => data.id !== action.payload.id),
      };
    case INCREASE_QUANTITY: {
      const updatedItems = state.cart.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: updatedItems,
      };
    }

    case DECREASE_QUANTITY: {
      const updatedItems = state.cart.map(item => {
        if (item.id === action.payload.id && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: updatedItems,
      };
    }
    default:
      return state;
  }
};
