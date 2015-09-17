import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChatActions from './../actions/ChatActionsCreators.js';
import * as AuthActions from './../actions/AuthActionsCreators.js';

function mapStateToProps(state) {
  return {
    session: state.session
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
}

class ChatLogin extends React.Component {

  handleLogin() {
    const loginNode = React.findDOMNode(this.refs.login);
    const passNode = React.findDOMNode(this.refs.pass);

    let a = loginNode.value;

    if(a == '1') {
      this.props.actions.connect({
        login: 'lifestyledot16@gmail.com',
        password: 'azertyuiop'
      });
    } else if(a == '2') {
      this.props.actions.connect({
        login: 'art@aa.com',
        password: 'azerty'
      });

    } else if(a == '3') {
      this.props.actions.connect({
        login: 'paul@aaa.com',
        password: 'azerty'
      });
    }
     else if(loginNode.value && passNode.value) {
      this.props.actions.connect({
        login: loginNode.value,
        password: passNode.value
      });
    } else {
      return;
    }

    // this.props.actions.connect({
    //   login: 'lifestyledot16@gmail.com',
    //   password: 'azertyuiop'
    // });

    // this.props.actions.connect({
    //   login: 'yannick@octopepper.com',
    //   password: 'azertyuiop'
    // });

    // this.props.actions.connect({
    //   login: loginNode.value,
    //   password: passNode.value
    // });


  }

  render(){
    return (
      <div style={ this.props.session.token ? styles.container : styles.container }>
        <input style={styles.input} type="email" ref="login" placeholder="email"/>
        <input style={styles.input} type="password" ref="pass" placeholder="password"/>
        <button style={styles.loginBtn} type="button" onClick={() => this.handleLogin()}>Login</button>
      </div>
    );
  }

}

const styles = {
  hidden: {
    display: 'none'
  },
  input: {
    border: '1px solid black',
    borderRadius: '2px',
    padding: '5px 6px',
    display: 'block',
    marginBottom: '10px',
    width: '85%'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  loginBtn: {
    padding: '9px 6px',
    width: '89%',
    fontSize: '15px'
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(ChatLogin);
