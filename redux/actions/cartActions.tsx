// import {ADD_TO_CART, REMOVE_FROM_CART} from '../actionTypes/cartActionTypes';

import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from '../actionTypes/cartActionTypes';

export const addItemToCart = (data: any) => ({
  type: ADD_TO_CART,
  payload: data,
});

export const removeItemFromCart = (data: any) => ({
  type: REMOVE_FROM_CART,
  payload: data,
});

export const increaseQuantity = (data: any) => ({
  type: INCREASE_QUANTITY,
  payload: data,
});

export const decreaseQuantity = (data: any) => ({
  type: DECREASE_QUANTITY,
  payload: data,
});
