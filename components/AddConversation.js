import React, { findDOMNode, Component, PropTypes } from 'react';

export default class AddConversation extends Component {
  handleClick() {
    const node = findDOMNode(this.refs.input);
    const text = node.value.trim();
    this.props.onAddClick(text);
    node.value = '';
  }

  render() {
    return (
      <div>
        <input type="text" ref="input" />
        <button onClick={(e) => this.handleClick(e)}>
          Add
        </button>
      </div>
    );
  }
}

AddConversation.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
