import React, { createRef } from "react";
import uniqid from "uniqid";
import "bootstrap/dist/css/bootstrap.min.css";
import UserControls from "./components/UserControls";
import TodoItemList from "./components/TodoItemList";
import "./material-design.css";
import "./App.css";
import * as constants from "./utils/constants";
import handleInputChange from "./utils/handleInputChange";
import validateInput from "./utils/validateInput";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos:
        localStorage.getItem("todos") === null
          ? []
          : JSON.parse(localStorage.getItem("todos")),
      status: constants.TODO_STATUS[0],
      arrowClicked: false,
      hideDropDown: false,
      todo: "",
      complete: false,
      maxInputLength: constants.MAX_INPUT_LENGTH,
      error: false,
    };

    this.checkboxRef = createRef();
    this.dropdown = createRef();
    this.setState = this.setState.bind(this);
  }

  handleChange = (e) => {
    handleInputChange(e, this);
  };

  handleCheckboxChange = (e) => {
    this.setState({ complete: e.target.checked });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let todo = this.state.todo.trim();

    if (!validateInput(todo, this)) return;

    const todoToBeSaved = {
      id: uniqid(),
      todo,
      isComplete: this.state.complete,
      time: Date.now(),
    };

    this.setState((prev) => {
      let updatedTodo = prev.todos.slice();

      updatedTodo.unshift(todoToBeSaved);
      localStorage.setItem("todos", JSON.stringify(updatedTodo));
      return {
        ...prev,
        todos: updatedTodo,
      };
    });

    if (this.checkboxRef.current.checked)
      this.checkboxRef.current.checked = false;

    this.setState({ todo: "", complete: false });
  };

  handleDelete = (id) => {
    this.setState((prev) => {
      let updatedTodo = [...prev.todos.filter((todo) => todo.id !== id)];
      localStorage.setItem("todos", JSON.stringify(updatedTodo));
      return {
        ...prev,
        todos: updatedTodo,
      };
    });
  };

  handleUpdateTodo = ({
    id,
    todo: updatedTodoText,
    isComplete,
    hideModal,
    updateModalThis,
  }) => {
    console.log(id, updatedTodoText, isComplete);

    if (!validateInput(updatedTodoText, updateModalThis)) return;

    this.setState((prev) => {
      let updatedTodo = [
        ...prev.todos.map((todo) =>
          todo.id !== id
            ? todo
            : { ...todo, todo: updatedTodoText, isComplete, time: Date.now() }
        ),
      ];
      localStorage.setItem("todos", JSON.stringify(updatedTodo));

      setTimeout(() => {
        hideModal();
      });
      return {
        ...prev,
        todos: updatedTodo,
      };
    });
  };

  handlecheckboxUpdate = (e, id) => {
    this.setState((prev) => {
      let updatedTodo = [
        ...prev.todos.map((todo) =>
          todo.id !== id ? todo : { ...todo, isComplete: e.target.checked }
        ),
      ];
      localStorage.setItem("todos", JSON.stringify(updatedTodo));
      return {
        ...prev,
        todos: updatedTodo,
      };
    });
  };

  handleDropdownClick = () => {
    this.setState((prev) => ({ ...prev, arrowClicked: !prev.arrowClicked }));
  };

  handleStatusChange = (e) => {
    this.setState((prev) => ({
      ...prev,
      status: e.target.value,
      hideDropDown: !prev.hideDropDown,
      arrowClicked: !prev.arrowClicked,
    }));

    this.dropdown.current.classList.toggle("active");
  };

  filterTodos = (todos, status = false) =>
    todos.filter((todo) => todo.isComplete === status);

  filteredTodos = (todos, status) => {
    // all => todos
    switch (status) {
      case constants.TODO_STATUS[0]:
        return todos;

      // complete => todos.isComplete = true
      case constants.TODO_STATUS[1]:
        return this.filterTodos(todos, !false);

      // incomplete => todos.isComplete = false
      case constants.TODO_STATUS[2]:
        return this.filterTodos(todos);

      default:
        return todos;
    }
  };

  render() {
    return (
      <>
        <div className="container-fluid main-app">
          <div className="container  app-container m-auto">
            <div className="p-2 app-header ">
              <h2 className="text-center" style={{ fontWeight: 700 }}>
                TODO APP
              </h2>
            </div>
            <UserControls
              checkboxRef={this.checkboxRef}
              complete={this.state.complete}
              error={this.state.error}
              handleSubmit={this.handleSubmit}
              todo={this.state.todo}
              handleChange={this.handleChange}
              maxInputLength={this.state.maxInputLength}
              handleCheckboxChange={this.handleCheckboxChange}
            />
            <TodoItemList
              checkboxRef={this.checkboxRef}
              handlecheckboxUpdate={this.handlecheckboxUpdate}
              handleDropdownClick={this.handleDropdownClick}
              arrowClicked={this.state.arrowClicked}
              hideDropDown={this.state.hideDropDown}
              dropDownRef={this.dropdown}
              todos={this.filteredTodos(this.state.todos, this.state.status)}
              modalTodoState={this.state}
              handleDelete={this.handleDelete}
              handleUpdateTodo={this.handleUpdateTodo}
              status={this.state.status}
              handleStatusChange={this.handleStatusChange}
            />
          </div>
        </div>
      </>
    );
  }
}
