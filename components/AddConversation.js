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
      user: this.props.user,
      text: text
    })
    node.value = '';
  }

  render() {
    return (
      <div style={{width:'400px', height:'100px', display:this.props.hidden}}>
        <label>{this.props.userName}</label>
        <input type="text" ref="input" />
        <button onClick={(e) => this.handleClick(e)}>
          Send
        </button>
      </div>
    );
  }
}

AddConversation.propTypes = {
  hidden: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onAddClick: PropTypes.func.isRequired
  // listStore: PropTypes.any.isRequired
};
