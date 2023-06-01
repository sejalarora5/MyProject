import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from '../actionTypes/wishlistActionTypes';

const initialState = {
  wishlist: [],
};

export const wishlistReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      if (!state.wishlist.includes(action.payload)) {
        return {
          wishlist: [...state.wishlist, action.payload],
        };
      }
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(data => data !== action.payload),
      };
    default:
      return state;
  }
};
