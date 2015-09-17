import { POST_MESSAGE, RECEIVE_MESSAGE, FRIEND_CONNECT, FRIEND_DISCONNECT, SELECT_FRIEND, FETCH_HISTORY, FETCH_HISTORY_SUCCESS, FETCH_HISTORY_ERROR } from '../constants/ActionTypes';

export function receiveMessage(message){
  console.log(message);
  return {
    type: RECEIVE_MESSAGE,
    message
  }
}

export function postMessage(text, fromID, toID){
  return {
    type: POST_MESSAGE,
    text,
    fromID,
    toID
  }
}


export function receiveEvent(event, session){

  switch (event.event_type) {
  case 1:
    return {
      type: RECEIVE_MESSAGE,
      message: event,
      session
    };

  case 2:
    if(event.presence) {
      return {
        type: FRIEND_CONNECT,
        friend: event
      };
    } else {
      return {
        type: FRIEND_DISCONNECT,
        friend: event
      };
    }

  default:
    return;
  }

}

export function selectFriend(friend) {
  return {
    type: SELECT_FRIEND,
    friend
  }
}


export function fetchHistory(friend, session, start, stop){
  return dispatch => {
    dispatch({ type : FETCH_HISTORY });

    var headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    });

    fetch(`http://chat.dev.yummypets.typhon.net/pets/${friend.id}/messages?token=${session.token}&start=${start}&stop=${stop}`)
    .then(res => res.json())
    .then((res) => {
      dispatch(fetchHistorySuccess(res, friend));
    })
    .catch((err) => {
      dispatch(fetchHistoryError(err));
    });
  }
}

export function fetchHistorySuccess(res, friend) {
  console.log(res);
  return {
    type: FETCH_HISTORY_SUCCESS,
    friend: friend,
    history: res
  };
}

export function fetchHistoryError(err) {
  console.log(err);
  return {
    type: FETCH_HISTORY_ERROR,
    errorMessage: err
  };
}
