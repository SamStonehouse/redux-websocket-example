import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChatActions from './../actions/ChatActionsCreators.js';
import ChatLogin from './chatlogin.js';
import ChatFriends from './chatfriends.js';

function mapStateToProps(state) {
  return {
    messages: state.messages,
    session: state.session,
    friendlist: state.friendlist
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChatActions, dispatch)
  };
}


class Chat extends React.Component {

  handleSendPost(){
    const messageNode = React.findDOMNode(this.refs.message);
    const idNode = React.findDOMNode(this.refs.id);

    let fromID = this.props.session.user._session.default_pet_id;
    let toID = this.props.friendlist.selectedFriend;
    let text = messageNode.value.trim();

    if(!text || !toID || !fromID){
      return;
    }

    this.props.actions.postMessage(text, fromID, toID);
    messageNode.value = '';
  }


  renderMessages(){
   return (
     <div style={styles.container}>
       <div style={styles.header}>
         Redux Chat
       </div>
       <ChatLogin />
       <div style={styles.msgInput}>
         <input style={styles.msgArea} type="text" ref="message" placeholder="message"/>
         <button style={styles.msgBtn} type="button" onClick={() => this.handleSendPost()}></button>
       </div>
       <ChatFriends />
       <div style={styles.msgListContainer}>
         <ul style={styles.msgList}>
           { this.props.messages.conversations[this.props.friendlist.selectedFriend].map( msg => (<li style={this.setMessageStyle(msg)}>{msg.message}</li>) ) }
         </ul>
       </div>
     </div>
   );
  }

  renderMessagesEmpty(){
    return (
      <div style={styles.container}>
        <ChatLogin />
        <div style={styles.msgInput}>
          <input style={styles.msgArea} type="text" ref="message" placeholder="message"/>
          <button style={styles.msgBtn} type="button" onClick={() => this.handleSendPost()}></button>
        </div>
        <ChatFriends />
        <p>No messages</p>
      </div>
    );
  }

  render(){
    const { friendlist, messages } = this.props;

    if(friendlist.selectedFriend !== -1 && !messages.conversations[friendlist.selectedFriend] && messages.conversations[friendlist.selectedFriend].length === 0) {
      return this.renderMessagesEmpty();
    } else {
      return this.renderMessages();
    }
  }

  setMessageStyle(msg){
    return (msg.from === this.props.session.id) ? styles.messageMine : styles.messageNotMine;
  }

}


const styles = {
  hidden: {
    display: 'none'
  },
  header: {
    display: 'flex',
    width: '100%',
    height: '52px',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  msgInput: {
    position: 'absolute',
    bottom: 0,
    // left: 0,
    // right: 0,
    width: '360px',
    padding: '12px 0',
    background: 'grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgArea: {
    width: '60%',
    padding: '8px 8px',
    borderRadius: '5px',
    border:' 1px solid transparent',
  },
  msgBtn: {
    marginLeft: '15px',
    padding: '10px',
    borderRadius: '100px',
    border: '1px solid black',
    width: '30px',
    height: '30px',
    'backgroundColor': 'green',
  },
  container: {
    width: '360px',
    position: 'relative',
    minHeight: '100vh'
  },
  messageMine: {
    color: 'black',
    background: 'white',
    padding: '15px 10px',
    maxWidth: '70%',
    display: 'inline-block',
    margin: '4px 0',
    alignSelf: 'flex-end',
    borderRadius: '6px',
  },
  messageNotMine: {
    color: 'white',
    background: 'grey',
    padding: '15px 10px',
    maxWidth: '70%',
    display: 'inline-block',
    margin: '4px 0',
    alignSelf: 'flex-start',
    borderRadius: '6px',
  },
  msgList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '80%'
  },
  msgListContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Chat);
