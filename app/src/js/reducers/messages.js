'use strict';

import { RECEIVE_MESSAGE, FRIEND_CONNECT, SELECT_FRIEND, FETCH_HISTORY_SUCCESS } from '../constants/ActionTypes';

import Message from '../utils/message.js';

const initialState = {
  conversations: {
    '-1' : []
  }
};

export default function messages(state = initialState, action) {

  switch (action.type) {
    case RECEIVE_MESSAGE:
      if(action.message.from === action.session.id) {
        return {
          conversations: {
            ...state.conversations,
            [ action.message.to ] : [ ...state.conversations[action.message.to], new Message(action.message)]
          }
        };

      } else if(action.message.to === action.session.id) {
        return {
          conversations: {
            ...state.conversations,
            [ action.message.from ] : [ ...state.conversations[action.message.from], new Message(action.message)]
          }
        };

      } else {
        return state;
      }


    case FRIEND_CONNECT:
      return {
        conversations: {
          ...state.conversations,
          [ action.friend.id ]: [],
        }
      };


    case FETCH_HISTORY_SUCCESS:
      return {
        conversations: {
          ...state.conversations,
          [ action.friend.id ]: action.history.concat(state.conversations[action.friend.id]),
        }
      };


    case SELECT_FRIEND:
      let _res = {};
      _res.conversations = {
        ...state.conversations
      };
      Object.keys(state.conversations).map(key => {
        if(parseInt(key) === action.friend.id) {
          _res.conversations[key] = state.conversations[key].map( msg => new Message(msg, true));
        } else {
          _res.conversations[key] = state.conversations[key];
        }
      });
      return _res;


    default:
      return state;
  }

}
