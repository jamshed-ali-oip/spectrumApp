import {
  GET_ASSESSMENTS_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  GET_GROUPS_REQUEST,
  GET_GROUP_MEMBERS_REQUEST,
  GET_COLORS_REQUEST,
  SUBMIT_RESULT,
  GET_GAME_INFO,
  GET_PARTICIPANTS_REQUEST,
  GET_PAST_ASSESSMENT,
  GET_ASSESSMENT_DETAILS,
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
      dispatch({
        type: GET_ASSESSMENTS_REQUEST,
        payload: [],
      });
      showMessage({
        message:
          response.data.message || response.data.msg || 'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    console.log(err?.response?.data?.msg || err?.response?.data?.message);
  }
};

export const getGroups = accessToken => async dispatch => {
  try {
    const URL = `${apiUrl}/grade`;
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
      dispatch({
        type: GET_GROUPS_REQUEST,
        payload: [],
      });
      showMessage({
        message:
          response.data.message || response.data.msg || 'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    console.log(
      err?.response?.data?.msg || err?.response?.data?.message,
      'GET_GROUPS_REQUEST',
    );
  }
};

export const getGroupMembers = (data, accessToken) => async dispatch => {
  try {
    const URL = `${apiUrl}/get-participant`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.post(URL, data, headers);
    if (response.data.success) {
      dispatch({
        type: GET_GROUP_MEMBERS_REQUEST,
        payload: response.data.data,
      });
    } else {
      dispatch({
        type: GET_GROUP_MEMBERS_REQUEST,
        payload: [],
      });
      showMessage({
        message:
          response?.data.data?.error ||
          response.data.message ||
          response.data.msg ||
          'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    console.log(
      err?.response?.data?.msg || err?.response?.data?.message,
      'GET_GROUP_MEMBERS_REQUEST',
    );
  }
};

export const getColors = accessToken => async dispatch => {
  try {
    const URL = `${apiUrl}/color`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(URL, headers);
    if (response.data.success) {
      dispatch({
        type: GET_COLORS_REQUEST,
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
    console.log(
      err?.response?.data?.msg || err?.response?.data?.message,
      'GET_COLORS_REQUEST',
    );
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

export const submitResult =
  (data, accessToken, onSuccess) => async dispatch => {
    try {
      const URL = `${apiUrl}/assessmentresult/add`;
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.post(URL, data, headers);
      if (response.data.success) {
        showMessage({
          message: 'Score Result Saved!',
          type: 'success',
        });
        onSuccess();
        // dispatch({
        //   type: SUBMIT_RESULT,
        //   payload: response.data.data,
        // });
      } else {
        showMessage({
          message:
            response.data.message ||
            response.data.msg ||
            'Something went wrong',
          type: 'danger',
        });
      }
    } catch (err) {
      showMessage({
        message: 'Network Error',
        type: 'danger',
      });
      console.log(err?.response?.data?.msg || err?.response?.data?.message);
    }
  };

export const getGameInfo = accessToken => async dispatch => {
  try {
    const URL = `${apiUrl}/assessmentscore`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(URL, headers);
    if (response.data.success) {
      dispatch({
        type: GET_GAME_INFO,
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
    console.log(err?.response?.data?.msg || err?.response?.data?.message);
  }
};

export const getParticipants = accessToken => async dispatch => {
  try {
    const URL = `${apiUrl}/participant/data`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(URL, headers);
    if (response.data.success) {
      dispatch({
        type: GET_PARTICIPANTS_REQUEST,
        payload: response.data.data,
      });
    } else {
      dispatch({
        type: GET_PARTICIPANTS_REQUEST,
        payload: [],
      });
      showMessage({
        message:
          response.data.message || response.data.msg || 'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    console.log(err?.response?.data?.msg || err?.response?.data?.message);
  }
};

export const getPastAssessment = (data, accessToken) => async dispatch => {
  // console.log(data);
  try {
    const URL = `${apiUrl}/participant/show`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.post(URL, data, headers);
    if (response.data.success) {
      // console.log(response.data.data, 'Data of past assessment');
      dispatch({
        type: GET_PAST_ASSESSMENT,
        payload: response.data.data,
      });
    } else {
      dispatch({
        type: GET_PAST_ASSESSMENT,
        payload: [],
      });
      showMessage({
        message:
          response.data.message || response.data.msg || 'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    console.log(err?.response?.data?.msg || err?.response?.data?.message);
  }
};

export const forgetPassword = (data, onFailed, onSuccess) => async dispatch => {
  try {
    const URL = `${apiUrl}/request_otp`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(URL, data, headers);

    if (response.data.success) {
      showMessage({
        message: response?.data?.message || response?.data?.msg,
        type: 'success',
      });
      onSuccess();
    } else {
      onFailed();
      showMessage({
        message:
          response?.data?.data?.error ||
          response?.data?.message ||
          response?.data?.msg ||
          'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    onFailed();
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    console.log(err?.response?.data?.msg || err?.response?.data?.message, err);
  }
};

export const getAssessmentDetails = (id, accessToken) => async dispatch => {
  try {
    const URL = `${apiUrl}/assessment/${id}`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(URL, headers);
    if (response.data.success) {
      dispatch({
        type: GET_ASSESSMENT_DETAILS,
        payload: response.data.data[0],
      });
    } else {
      dispatch({
        type: GET_ASSESSMENT_DETAILS,
        payload: null,
      });
      showMessage({
        message:
          response.data.message || response.data.msg || 'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    console.log(
      err?.response?.data?.msg || err?.response?.data?.message || err,
    );
  }
};

export const verifyOtp = (data, onFailed, onSuccess) => async dispatch => {
  try {
    const URL = `${apiUrl}/verify_otp`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(URL, data, headers);

    if (response.data.success) {
      showMessage({
        message: response?.data?.message || response?.data?.msg,
        type: 'success',
      });
      onSuccess();
    } else {
      onFailed();
      showMessage({
        message:
          response?.data?.data?.error ||
          response?.data?.message ||
          response?.data?.msg ||
          'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    onFailed();
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    console.log(err?.response?.data?.msg || err?.response?.data?.message, err);
  }
};


export const resetPassword = (data, onFailed, onSuccess) => async dispatch => {
  try {
    const URL = `${apiUrl}/reset-password`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(URL, data, headers);

    if (response.data.success) {
      showMessage({
        message: response?.data?.message || response?.data?.msg,
        type: 'success',
      });
      onSuccess();
    } else {
      onFailed();
      showMessage({
        message:
          response?.data?.data?.error ||
          response?.data?.message ||
          response?.data?.msg ||
          'Something went wrong',
        type: 'danger',
      });
    }
  } catch (err) {
    onFailed();
    showMessage({
      message: err?.response?.data?.msg || err?.response?.data?.message,
      type: 'danger',
    });
    console.log(err?.response?.data?.msg || err?.response?.data?.message, err);
  }
};