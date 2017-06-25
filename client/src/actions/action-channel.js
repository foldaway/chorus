import * as types from '../constants/action-types';
import API_ROOT from '../constants/api-url';

const createChannelRequest = () => ({
  type: types.CREATE_CHANNEL_REQUEST
});

const createChannelSuccess = (data) => ({
  type: types.CREATE_CHANNEL_SUCCESS,
  data
});

const createChannelFailure = (error) => ({
  type: types.CREATE_CHANNEL_FAILURE,
  error
});

export const createChannel = (data) => (dispatch) => {
  dispatch(createChannelRequest());
  return fetch(`${API_ROOT}/api/channels`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
    .then((response) => (
      response.json()
    ))
    .then((json) => {
      dispatch(createChannelSuccess(json));
    })
    .catch((error) => {
      dispatch(createChannelFailure(error));
    });
};

const fetchChannelRequest = () => ({
  type: types.FETCH_CHANNEL_REQUEST
});

const fetchChannelSuccess = (data) => ({
  type: types.FETCH_CHANNEL_SUCCESS,
  data
});

const fetchChannelFailure = (error) => ({
  type: types.FETCH_CHANNEL_FAILURE,
  error
});

export const fetchChannel = (channelId) => (dispatch) => {
  dispatch(fetchChannelRequest());
  return fetch(`${API_ROOT}/api/channels/${channelId}`, {
    method: 'GET'
    // credentials: 'include'
  })
    .then((response) => (
      response.json()
    ))
    .then((json) => {
      dispatch(fetchChannelSuccess(json));
    })
    .catch((error) => {
      dispatch(fetchChannelFailure(error));
    });
};
