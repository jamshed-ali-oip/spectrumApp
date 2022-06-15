import {
  GET_ASSESSMENTS_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,GET_GROUPS_REQUEST
} from './actionType';
import axios from 'axios';
import {apiUrl} from '../../config';
import {showMessage, hideMessage} from 'react-native-flash-message';

export const loginRequest = (data, onLoginFailed) => async dispatch => {
  try {
    const URL = `${apiUrl}/login`;
    const response = await axios.post(URL, data);
    if (response.data.success) {
      dispatch({
        type: LOGIN_REQUEST,
        payload: response.data.data,
      });
    } else {
      onLoginFailed();
      showMessage({
        message:
          response.data.message || response.data.msg || 'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    onLoginFailed();
    console.log(err);
  }
};

export const getAssessments = accessToken => async dispatch => {
  try {
    const URL = `${apiUrl}/assessment`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(URL, headers);
    if (response.data.success) {
      dispatch({
        type: GET_ASSESSMENTS_REQUEST,
        payload: response.data.data,
      });
    } else {
      showMessage({
        message:
          response.data.message || response.data.msg || 'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getGroups = accessToken => async dispatch => {
  try {
    const URL = `${apiUrl}/groups`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(URL, headers);
    if (response.data.success) {
      dispatch({
        type: GET_GROUPS_REQUEST,
        payload: response.data.data,
      });
    } else {
      showMessage({
        message:
          response.data.message || response.data.msg || 'Something went wrong',
        type: 'danger',
      });
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
