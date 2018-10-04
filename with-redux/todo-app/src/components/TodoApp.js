import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewTodoForm from './NewTodoForm';
import TodoList from './TodoList';
import { actions } from '../store';

class TodoApp extends Component {

  formSubmitted(event) {
    event.preventDefault();
    this.props.onAddTodo({
      title: this.props.newTodo,
      done: false
    });

    this.props.onNewTodoChanged('');
  }

  toggleTodoDone(event, index) {
    this.props.onToggleTodoDone({
      index,
      checked: event.target.checked
    });
  }

  removeTodo(index) {
    this.props.onRemoveTodo({
      index
    });
  }

  allDone() {
    this.props.onAllDone();
  }

  render() {
    return (
      <div className="App">
        <h3>{this.props.message}</h3>
        <NewTodoForm
          newTodo={this.props.newTodo}
          formSubmitted={this.formSubmitted.bind(this)}
          newTodoChanged={(event) => this.props.onNewTodoChanged(event.target.value)} />
        <button onClick={() => this.allDone()}>All Done</button>
        <TodoList
          todos={this.props.todos}
          toggleTodoDone={this.toggleTodoDone.bind(this)}
          removeTodo={this.removeTodo.bind(this)} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onNewTodoChanged(newTodo) {
      dispatch(actions.newTodoChanged(newTodo));
    },
    onAddTodo(todo) {
      dispatch(actions.addTodo(todo));
    },
    onToggleTodoDone(toggle) {
      dispatch(actions.toggleTodoDone(toggle));
    },
    onRemoveTodo(todo) {
      dispatch(actions.removeTodo(todo));
    },
    onAllDone(todos) {
      dispatch(actions.allDone(todos));
    }
  }
}

function mapStateToProps(state) {
  return {
    message: state.message,
    newTodo: state.newTodo,
    todos: state.todos
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
