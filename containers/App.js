import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions';
import AddConversation from '../components/AddConversation';
import ChatList from '../components/ChatList';
import Firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {user1: false, on: false}
    this.handleUser1 = this.handleUser1.bind(this);
    this.handleUser2 = this.handleUser2.bind(this);
    // console.log(this.state)
  }

  handleUser1() {
    this.setState({user1: true, on: true})
  }

  handleUser2() {
    this.setState({user1: false, on: true})
  }

  render() {
    const { dispatch, visibleTodos} = this.props;
    return (
      <div>
        <ChatList
          todos={visibleTodos}
          onTodoClick={index => dispatch(completeTodo(index))} />
        <h5>Which user are you?</h5>  
        <button onClick={this.handleUser1}>User 1</button>
         <button onClick={this.handleUser2}>User 2</button>
        <AddConversation
          onAddClick={text => dispatch(addTodo(text))} 
          user={(this.state.user1) ? 'user1' : 'user2'}
          userName={(this.state.user1) ? 'user1' : 'user2'}
          hidden={(this.state.on) ? '' : 'none'}
          />
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
