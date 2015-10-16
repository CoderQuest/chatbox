import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions';
import AddConversation from '../components/AddConversation';
import ChatList from '../components/ChatList';
// import Footer from '../components/Footer';

class App extends Component {
  render() {
    const { dispatch, visibleTodos} = this.props;
    return (
      <div>
        <ChatList
          todos={visibleTodos}
          onTodoClick={index => dispatch(completeTodo(index))} />
        <AddConversation
          onAddClick={text => dispatch(addTodo(text))} />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  })),
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
};

function selectTodos(todos, filter) {
  switch (filter) {
  default:
  case VisibilityFilters.SHOW_ALL:
    return todos;
  case VisibilityFilters.SHOW_COMPLETED:
    return todos.filter(todo => todo.completed);
  case VisibilityFilters.SHOW_ACTIVE:
    return todos.filter(todo => !todo.completed);
  }
}

function select(state) {
  return {
    visibleTodos: selectTodos(state.todos.present, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  };
}

export default connect(select)(App);
