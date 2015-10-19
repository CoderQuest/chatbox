import React, { Component, PropTypes } from 'react';
// import Firebase from 'firebase';
import Rebase form 're-base';

let base = Rebase.createClass('https://dazzling-fire-504.firebaseio.com/');

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []}
    // console.log(this.state)
  }

  componentWillMount() {
    this.fbRef = new Firebase('https://dazzling-fire-504.firebaseio.com/');
    // console.log(this.state);
    let _this = this;
    let chats = this.fbRef.on("child_added", function(snapshot) {
      let data = snapshot.val();
      let name = data.user;
      let message = data.text;
      let messageDetail = {user: name, text: message}
      _this.setState((state) => {messages: state.messages.push(messageDetail) })
    });
  }

  render() {
      let messages = this.state.messages.map((message, index) => {
        return (
          <li key={index}>{message.user}: {message.text}</li>
        )
      })
    return (
      // <li onClick={this.props.onClick}></li>
      <ul>
        <li>{messages}</li>
      </ul>
    );
  }
}

List.propTypes = {
  // onClick: PropTypes.func.isRequired,
  // text: PropTypes.string.isRequired,
  // completed: PropTypes.bool.isRequired
};
