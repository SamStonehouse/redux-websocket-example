import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChatActions from './../actions/ChatActionsCreators.js';

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


function checkConversationChanged(){
  return Object.keys(this.props.messages.conversations).map((key) => {
    return nextProps.messages.conversations[key] !==  this.props.messages.conversations[key]
  }).some((bool) => !!bool);
}


class ChatFriends extends React.Component {

  handleClick(friend) {
    this.props.actions.selectFriend(friend);
    this.props.actions.fetchHistory(friend, this.props.session, -20, -1);
  }

  renderFriendListEmpty() {
    return (
      <div style={styles.friendListContainer}>
        <p style={styles.noFriends}>No friends</p>
      </div>
    );
  }

  renderFriendList() {
    let friends = this.props.friendlist.friends;
    let selectedFriend = this.props.friendlist.selectedFriend;
    let conversations = this.props.messages.conversations;
    return (
      <div style={styles.friendListContainer}>
        <ul style={styles.friendList}>
          {
            Object.keys(friends).map( key => {
              return (
                <li
                  onClick={() => this.handleClick(friends[key])}
                  style={ this.computeListItemStyle(key, selectedFriend) }>{friends[key].pseudo}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }

  render(){
    if (Object.keys(this.props.friendlist.friends).length === 0) {
      return this.renderFriendListEmpty();
    } else {
      return this.renderFriendList();
    }
  }

  computeListItemStyle(key, selectedFriend) {
    let friends = this.props.friendlist.friends;
    let conversations = this.props.messages.conversations;
    let hasNewMessages = (conversations[key].some((msg) => !msg.read));


    if(!friends[key].presence) {
      return styles.friendItemHidden
    } else if( parseInt(key) === selectedFriend ) {
      return styles.selectedFriendItem
    } else if (hasNewMessages) {
      return styles.friendItemUnread;
    } else {
      return styles.friendItem;
    }
  }

}



const styles = {
  friendItem: {
    display: 'inline-block',
    listStyle: 'none',
    padding: '5px 8px',
    borderRadius: '20px',
    cursor: 'pointer',
    margin: '0 4px',
  },

  friendItemHidden: {
    display: 'none',
    listStyle: 'none',
    padding: '5px 8px',
    borderRadius: '20px',
    cursor: 'pointer',
    margin: '0 4px',
  },

  friendItemUnread: {
    display: 'inline-block',
    listStyle: 'none',
    background: 'blue',
    padding: '5px 8px',
    borderRadius: '20px',
    cursor: 'pointer',
    margin: '0 4px',
  },

  selectedFriendItem: {
    display: 'inline-block',
    listStyle: 'none',
    background: 'red',
    padding: '5px 8px',
    borderRadius: '20px',
  },

  friendList : {
    margin: 0,
    padding: '10px 10px'
  },

  noFriends: {
    padding: '10px 0'
  },

  friendListContainer: {
    borderTop: '1px solid grey',
    borderBottom: '1px solid grey',
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(ChatFriends);
