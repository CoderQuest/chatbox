import React, { Component, PropTypes } from 'react';
import List from './List';

export default class ChatList extends Component {
  render() {
    return (
      <div style={{width:'400px', height:'100px', overflow:'scroll', border:'1px black solid'}}>
          <List 
            onClick={() => this.props.onTodoClick(index)} 
          />
      </div>
    );
  }
}

ChatList.propTypes = {
  onTodoClick: PropTypes.func.isRequired
  // todos: PropTypes.arrayOf(PropTypes.shape({
  //   text: PropTypes.string.isRequired,
  //   completed: PropTypes.bool.isRequired
  // }).isRequired).isRequired
};
