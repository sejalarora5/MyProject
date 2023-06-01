import {ADD_TO_CART, REMOVE_FROM_CART} from '../actionTypes/cartActionTypes';

export const addItemToCart = (data: any) => ({
  type: ADD_TO_CART,
  payload: data,
});

export const removeItemFromCart = (data: any) => ({
  type: REMOVE_FROM_CART,
  payload: data,
});

// export const removeItemFromCart = (data: any) => ({
//   type: REMOVE_FROM_CART,
//   payload: data,
// });
