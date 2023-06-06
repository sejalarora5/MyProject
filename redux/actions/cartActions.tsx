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

// export const addItemToCart = ({id, ...product}, items) => {
//   const existingItemIndex = items.findIndex(item => item.id === id);
//   const updatedItems =
//     existingItemIndex === -1
//       ? [...items, {id, ...product, count: 1}]
//       : items.map(item =>
//           item.id === id ? {...item, count: item.count + 1} : item,
//         );

//   return {type: ADD_TO_CART, payload: updatedItems};
// };

// export const removeItemFromCart = (id, items) => {
//   const updatedItems = items.map(item =>
//     item.id === id ? {...item, count: 0} : item,
//   );

//   return {type: REMOVE_FROM_CART, payload: updatedItems};
// };

// export const increaseQuantity = (id, items) => {
//   const updatedItems = items.map(item =>
//     item.id === id ? {...item, count: item.count + 1} : item,
//   );
//   return {type: INCREASE_QUANTITY, payload: updatedItems};
// };
// export const decreaseQuantity = (id, items) => {
//   const updatedItems = items.map(item =>
//     item.id === id ? {...item, count: item.count - 1} : item,
//   );
//   return {type: DECREASE_QUANTITY, payload: updatedItems};
// };

// export const clearCart = () => {
//   return {type: 'CLEAR_CART'};
// };
