import { AUTH_CONNECTING, AUTH_CONNECTED, AUTH_ERROR } from '../constants/ActionTypes';


export function connect(credentials){
  return dispatch => {
    dispatch({ type : 'AUTH_CONNECTING' });

    var headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    });

    var requestParams = {
      method: 'POST',
      headers: headers,
      body: `login=${credentials.login}&password=${credentials.password}`
    };

    fetch('http://api.dev.yummypets.typhon.net/connect', requestParams)
    .then(res => res.json())
    .then((res) => {
      dispatch(connectSuccess(res));
    })
    .catch((err) => {
      dispatch(connectError(err));
    });
  }
}

export function connectSuccess(user) {
  return {
    type: AUTH_CONNECTED,
    user
  };
}

export function connectError(errorMessage) {
  return {
    type: AUTH_ERROR,
    errorMessage
  };
}
