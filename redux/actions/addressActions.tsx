import {
  CLEAR_ADDRESS,
  SAVE_ADDRESS_DETAILS,
} from '../actionTypes/addressActionType';

export const saveAddressDetails = (newAddressDetails: any) => {
  return {
    type: SAVE_ADDRESS_DETAILS,
    payload: newAddressDetails,
  };
};

// export const clearAddress = addressId => {
//   return {
//     type: CLEAR_ADDRESS,
//     payload: addressId,
//   };
// };
