import messages from './messages.js';
import session from './session.js';
import friendlist from './friendlist.js';

function lastAction(state = null, action) {
  return action;
}

export default { messages, session, friendlist, lastAction };
