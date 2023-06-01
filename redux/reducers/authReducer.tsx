import {
  SET_USER_LOGGED_IN,
  SET_USER_LOGGED_OUT,
} from '../actionTypes/loginActionTypes';

export interface AuthState {
  loggedIn: boolean;
}

export const initialState: AuthState = {
  loggedIn: false,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
      };
    case SET_USER_LOGGED_OUT:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
};
