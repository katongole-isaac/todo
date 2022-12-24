import NoTodo from "./NoTodo";
import { createRef } from "react";

import TodoHeader from "./TodoHeaders";
import TodoItem from "./TodoItem";
import UpdateModel from "./UpdateModel";
import * as bootstrap from "bootstrap";

export default class TodoItemList extends React.Component {
  constructor(props) {
    super(props);
    this.modalRef = createRef();
    this.state = {
      todoToBeUpdated: null,
    };
  }

  todoItem = (todo) => (
    <TodoItem
      key={todo.id}
      {...todo}
      handleDelete={this.props.handleDelete}
      handlecheckboxUpdate={this.props.handlecheckboxUpdate}
      showModal={this.showModal}
    />
  );

  showModal = (todo) => {
    const modalElement = this.modalRef.current;
    const bsModal = new bootstrap.Modal(modalElement, {
      backdrop: "static",
      keyboard: true,
    });

    this.setState({
      todoToBeUpdated: todo,
    });

    bsModal.show();
  };

  hideModal = () => {
    const modalElement = this.modalRef.current;
    const bsModal = bootstrap.Modal.getInstance(modalElement);
    bsModal.hide();
  };

  render() {
    return (
      <>
        <UpdateModel
          todo={this.state.todoToBeUpdated}
          modalRef={this.modalRef}
          hideModal={this.hideModal}
          
          checkboxRef={this.props.checkboxRef}
          handleUpdateTodo={this.props.handleUpdateTodo}
          handleCheckboxChange={this.props.handleCheckboxChange}
        />

        <div className=" todo-items-list ">
          <TodoHeader
            dropDownRef={this.props.dropDownRef}
            handleStatusChange={this.props.handleStatusChange}
            status={this.props.status}
            handleDropdownClick={this.props.handleDropdownClick}
            arrowClicked={this.props.arrowClicked}
            hideDropDown={this.props.hideDropDown}
          />

          {this.props.todos.length === 0 && (
            <>
              <NoTodo />
            </>
          )}
          <div className=" w-100 ">
            {this.props.todos.map((todo) => {
              return this.todoItem(todo);
            })}
          </div>
        </div>
      </>
    );
  }
}
