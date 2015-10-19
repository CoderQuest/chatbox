import React, { Component, PropTypes } from 'react';
// import Firebase from 'firebase';
import Rebase from 're-base';

let base = Rebase.createClass('https://dazzling-fire-504.firebaseio.com/');

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []}
    // console.log(this.state)
  }

  componentWillMount() {
    base.syncState('/', {
      context: this,
      asArray: true,
      state: 'messages',
    });
  }

  render() {
      let messages = this.state.messages.map((message, index) => {
        return (
          <li key={index}>{message.user}: {message.text}</li>
        )
      })
    return (    
      <ul>
        {messages}
      </ul>
    );
  }
}

List.propTypes = {
  // onClick: PropTypes.func.isRequired,
  // text: PropTypes.string.isRequired,
  // completed: PropTypes.bool.isRequired
};