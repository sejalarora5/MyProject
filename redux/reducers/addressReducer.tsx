import {
  // CLEAR_ADDRESS,
  SAVE_ADDRESS_DETAILS,
} from '../actionTypes/addressActionType';

const initialState = {
  addressDetails: [],
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ADDRESS_DETAILS:
      return {
        ...state,
        addressDetails: [...state.addressDetails, action.payload],
      };

    default:
      return state;
  }
};

export default addressReducer;
// addressDetails: [
//   ...state.addressDetails,
//   ...Array.from(action.payload),
// ],

// case CLEAR_ADDRESS:
//   return {
//     ...state,
//     addressDetails: state.addressDetails.filter(
//       address => address.id !== action.payload,
//     ),
//   };
