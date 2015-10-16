import React, { Component, PropTypes } from 'react';
import List from './List';

export default class ChatList extends Component {
  render() {
    return (
      <ul style={{width:'400px', height:'100px'}}>
        {this.props.todos.map((todo, index) =>
          <List {...todo}
                key={index}
                onClick={() => this.props.onTodoClick(index)} />
        )}
      </ul>
    );
  }
}

ChatList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
};
