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
  GET_FACILIATOR_INSTRUCTIONS,
  GET_FILTERED_PARTICIPANTS,
  CHECK_GAME,
  SAVE_SOCKET_REF,
  GET_LOGIN_IMG,
} from './actionType';
import axios from 'axios';
import {apiUrl,imageUrl} from '../../config';
import {showMessage, hideMessage} from 'react-native-flash-message';

export const checkGame = bool => dispatch => {
  try {
    dispatch({
      type: CHECK_GAME,
      payload: bool,
    });
  } catch (err) {
    // console.log(err);
  }
};

export const saveSocketRef = socketRef => dispatch => {
  dispatch({
    type: SAVE_SOCKET_REF,
    payload: socketRef,
  });
};

export const sendFCMToken = (data, accessToken) => async dispatch => {
  try {
    const URL = `${apiUrl}/get-fcm-token`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.post(URL, data, headers);
    // console.log(response.data);
  } catch (err) {
    // console.log(err?.response?.data?.message);
  }
};
export const loginRequest = (data, onLoginFailed) => async dispatch => {
  try {
    const URL = `${apiUrl}/login`;
    const response = await axios.post(URL, data);
    if (response.data.success) {
      // console.log(response.data.data,"======================")
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
    showMessage({
      message:'unauthorized',
      type: 'danger',
    });
    onLoginFailed();
    // console.log(err);
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
    // console.log(err?.response?.data?.msg || err?.response?.data?.message);
  }
};

export const getGroups = accessToken => async dispatch => {
  try {
    const URL = `${apiUrl}/group`;
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
    // console.log(
    //   err?.response?.data?.msg || err?.response?.data?.message,
    //   'GET_GROUPS_REQUEST',
    // );
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
      // showMessage({
      //   message:
      //     response?.data.data?.error ||
      //     response.data.message ||
      //     response.data.msg ||
      //     'Something went wrong',
      //   type: 'danger',
      // });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    // console.log(
    //   err?.response?.data?.msg || err?.response?.data?.message,
    //   'GET_GROUP_MEMBERS_REQUEST',
    // );
  }
};

export const getFilteredParticipants =
  (data, accessToken, onSuccess) => async dispatch => {
    // console.log(data, '===', accessToken);
    // alert(JSON.stringify(data))
    try {
      const URL = `${apiUrl}/participants/filter`;
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.post(URL, data, headers);
      // console.log(response.data);
      // alert(JSON.stringify(response.data))
      onSuccess();
      if (response.data.success) {
        dispatch({
          type: GET_FILTERED_PARTICIPANTS,
          payload: response.data.data,
        });
      } else {
        dispatch({
          type: GET_FILTERED_PARTICIPANTS,
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
      // console.log(
      //   err?.response?.data?.msg || err?.response?.data?.message,
      //   'GET_FILTERED_PARTICIPANTS',
      //   err,
      // );
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
    // console.log(
    //   err?.response?.data?.msg || err?.response?.data?.message,
    //   'GET_COLORS_REQUEST',
    // );
  }
};

export const logoutRequest = data => async dispatch => {
  try {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  } catch (err) {
    // console.log(err);
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
      // console.log(err?.response?.data?.msg || err?.response?.data?.message);
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
    // console.log(err?.response?.data?.msg || err?.response?.data?.message);
  }
};

export const getParticipants = accessToken => async dispatch => {
  console.log("aaa",accessToken)
  try {
    const URL = `${apiUrl}/participant`;
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
      // showMessage({
      //   message:
      //     response?.data.data?.error ||
      //     response.data.message ||
      //     response.data.msg ||
      //     'Something went wrong',
      //   type: 'danger',
      // });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error',
      type: 'danger',
    });
    console.log(
      'Participants Screen Error: ',
      err?.response?.data?.msg || err?.response?.data?.message,
    );
  }
};

export const getPastAssessment = (data, accessToken) => async dispatch => {
  // console.log(data);
  alert(JSON.stringify(data))
  try {
    const URL = `${apiUrl}/participant/${data.id}`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(URL,headers);
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
      // showMessage({
      //   message:
      //     response?.data.data?.error ||
      //     response.data.message ||
      //     response.data.msg ||
      //     'Something went wrong',
      //   type: 'danger',
      // });
    }
  } catch (err) {
    showMessage({
      message: 'Network Error1',
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
    console.log("WWwwwwwwwwwwwwwwwwwwww", response.data);
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

export const getFaciliatorInstructions = accessToken => async dispatch => {
  try {
    const URL = `${apiUrl}/facilitator/instruction`;
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get(URL, headers);
    if (response.data.success) {
      dispatch({
        type: GET_FACILIATOR_INSTRUCTIONS,
        payload: response.data.data,
      });
    } else {
      dispatch({
        type: GET_FACILIATOR_INSTRUCTIONS,
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

export const changeStatus = id => async dispatch => {
  const res=await axios.post(`${apiUrl}/participant_status`,{id})
  return res
}

export const getLoginImg = id => async dispatch => {
  const res=await axios.get(`${apiUrl}/logo`)
  dispatch({
    type:GET_LOGIN_IMG,
    payload:imageUrl+"/logo/"+res.data?.data[0]?.logo
  })
}