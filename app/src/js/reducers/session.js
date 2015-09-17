'use strict';

import { AUTH_CONNECTING, AUTH_CONNECTED, AUTH_ERROR } from '../constants/ActionTypes';

const initialState = {
  connected: false,
  loading: false,
  token: null,
  user: null,
  errorMessage: null,
  id: null
};

export default function session(state = initialState, action) {

  switch (action.type) {
  case AUTH_CONNECTING:
    return {
      loading: true,
      connected: false,
      token: state.token,
      errorMessage: null,
      user: null,
      id: null
    };

  case AUTH_CONNECTED:
    return {
      loading: false,
      connected: true,
      token: action.user.authToken,
      errorMessage: null,
      user: action.user,
      id: action.user._session.default_pet_id
    };

  case AUTH_ERROR:
    return {
      loading: false,
      connected: false,
      token: null,
      errorMessage: action.errorMessage,
      user: null,
      id: null
    };

  default:
    return state;
  }

}
