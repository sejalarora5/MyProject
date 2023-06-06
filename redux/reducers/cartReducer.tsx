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

    // case INCREASE_QUANTITY:

    // let updatedProduct = state.cart.map(currElement => {
    //   if (currElement.id === action.payload) {
    //     let decAmount = currElement.amount + 1;

    //     if (decAmount <= 1) {
    //       decAmount = 1;
    //     }
    //     return {
    //       ...currElement,
    //       amount: decAmount,
    //     };
    //   } else {
    //     return currElement;
    //   }
    // });

    default:
      return state;
  }
};

// const initialState = {
//   cart: [],
// };

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       // Add the new item to the cart
//       return {
//         ...state,
//         cart: action.payload,
//       };

//     case REMOVE_FROM_CART:
//       return {
//         ...state,
//         cart: action.payload,
//       };

//     case INCREASE_QUANTITY:
//       return {
//         ...state,
//         cart: action.payload,
//       };
//     case DECREASE_QUANTITY:
//       return {
//         ...state,
//         cart: action.payload,
//       };

//     // case CLEAR_CART:
//     //   // Clear all items from the cart
//     //   return {
//     //     ...state,
//     //     items: [],
//     //   };

//     default:
//       return state;
//   }
// };

// export default cartReducer;
