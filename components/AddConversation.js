import React, { findDOMNode, Component, PropTypes } from 'react';
import Firebase from 'firebase';

export default class AddConversation extends Component {
  componentWillMount() {
    this.fbRef = new Firebase('https://dazzling-fire-504.firebaseio.com/');
  }

  handleClick() {
    const node = findDOMNode(this.refs.input);
    const text = node.value.trim();
    this.props.onAddClick(text);
    this.fbRef.push({
      user: 'Yi',
      text: text
    })
    node.value = '';
  }

  render() {
    return (
      <div>
        <input type="text" ref="input" />
        <button onClick={(e) => this.handleClick(e)}>
          Send
        </button>
      </div>
    );
  }
}

AddConversation.propTypes = {
  onAddClick: PropTypes.func.isRequired,
  // listStore: PropTypes.any.isRequired
};
