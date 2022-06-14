import {LOGIN_REQUEST, LOGOUT_REQUEST} from '../actions/actionType';
const INITIAL_STATE = {
  isLogin: false,
  userData: null,
  accessToken: '',
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLogin: true,
        accessToken: 'Something',
        // userData:action.payload
      };

    case LOGOUT_REQUEST:
      return {
        isLogin: false,
        userData: null,
        accessToken: '',
      };

    default:
      return state;
  }
};
