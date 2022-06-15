import {
  GET_ASSESSMENTS_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
} from '../actions/actionType';

const INITIAL_STATE = {
  isLogin: false,
  userData: null,
  accessToken: '',
  assessments: [],
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLogin: true,
        accessToken: action.payload.token,
        userData: action.payload,
      };

    case GET_ASSESSMENTS_REQUEST:
      return {
        ...state,
        assessments: action.payload,
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
