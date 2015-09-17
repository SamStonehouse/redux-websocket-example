import React from 'react';
import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import Chat from './components/chat.js';
import WSInstance from './utils/ChatWebsocket.js';
import * as ChatActions from './actions/ChatActionsCreators.js';
import * as ActionTypes from './constants/ActionTypes.js';

const reducer = combineReducers(reducers);

function configureStore() {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
  const store = finalCreateStore(reducer);

  if (module.hot) {
    module.hot.accept('./reducers/', () => {
      const nextRootReducer = require('./reducers/index.js');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

const redux = configureStore();


function selectState(state) {
  return state;
}

React.render(
  <div>
    <Provider store={redux}>
      {() => <Chat />}
    </Provider>
    <DebugPanel top right bottom>
       <DevTools store={redux}
                 monitor={LogMonitor}
                 select={selectState} />
     </DebugPanel>
  </div>,
  document.getElementById("appview")
);


const URL = 'echo.websocket.org';

const sock = {
  ws: null,
  URL: 'echo.websocket.org',
  wsDipatcher: (msg) => {
    const { session } = redux.getState();
    return redux.dispatch(ChatActions.receiveEvent(msg, session));
  },
  wsListener: () => {
    const { session, lastAction } = redux.getState();

    switch (lastAction.type) {
      case ActionTypes.POST_MESSAGE:
        return sock.ws.postMessage(lastAction.text, lastAction.fromID, lastAction.toID);

      case ActionTypes.AUTH_CONNECTED:
        return sock.startWS(session);

      default:
        return;
    }
  },
  startWS: (session) => {
    if(!!sock.ws){
      sock.ws.close();
    }

    if(session.token){
      sock.ws = new WSInstance(sock.URL, session.token, sock.wsDipatcher)
    }
  }
};

redux.subscribe(() => sock.wsListener());
