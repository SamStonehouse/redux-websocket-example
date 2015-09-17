'use strict';

import { FRIEND_CONNECT, FRIEND_DISCONNECT, SELECT_FRIEND } from '../constants/ActionTypes';

const initialState = {
  friends: {},
  selectedFriend: -1,
};

export default function friendlist(state = initialState, action) {

  switch (action.type) {
    case FRIEND_CONNECT:
      return {
        ...state,
        friends: {
          ...state.friends,
          [ action.friend.id ]: action.friend
        }
      };

    case FRIEND_DISCONNECT:
      let newState = { ...state };
      delete newState.friends[action.friend.id];
      return newState;

    case SELECT_FRIEND:
      return {
        ...state,
        selectedFriend: action.friend.id
      };

    default:
      return state;
  }

}
