import {LOGIN_REQUEST} from './actionType';

export const loginRequest = data => async dispatch => {
  try {
    if (data.email === 'admin' && data.password == 'admin') {
      dispatch({
        type: LOGIN_REQUEST,
        payload: data,
      });
    } else {
      alert("Wrong Crdentials")
    }
  } catch (err) {
    console.log(err);
  }
};

export const logoutRequest = data => async dispatch => {
  try {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  } catch (err) {
    console.log(err);
  }
};
