import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from '../actionTypes/wishlistActionTypes';

export const addItemToWishlist = (data: any) => ({
  type: ADD_TO_WISHLIST,
  payload: data,
});

export const removeItemFromWishlist = (data: any) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: data,
});

// export const removeItemFromWishlist = (index: any) => ({
//   type: REMOVE_FROM_WISHLIST,
//   payload: index,
// });
