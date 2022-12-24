import { createRef } from "react";
import CheckBox from "./CheckBox";

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.modalRef = createRef();
  }

  componentDidMount() {
    if (this.props.isComplete) this.inputRef.current.checked = true;
  }
  componentDidUpdate() {
    if (this.props.isComplete) this.inputRef.current.checked = true;
    else this.inputRef.current.checked = false;
  }

  render() {
    return (
      <>
        <div className="d-flex justify-content-between border border-light shadow-sm m-2 rounded p-1  todo-item  align-item-center">
          <div className="d-flex gap-2">
            <CheckBox
              todoId={this.props.id}
              complete={this.props.isComplete}
              checkboxRef={this.inputRef}
              handlecheckboxUpdate={this.props.handlecheckboxUpdate}
            />
            <div className="vh-stack d-flex flex-column position-relative">
              <p>
                {this.props.isComplete ? (
                  <s>{this.props.todo}</s>
                ) : (
                  this.props.todo
                )}
              </p>
              <small className="text-muted">
                {new Date(this.props.time).toLocaleString()}{" "}
              </small>
            </div>
          </div>

          <div className=" d-flex align-items-center gap-2 ">
            <span
              className="material-symbols-outlined  delete rounded"
              onClick={() => this.props.handleDelete(this.props.id)}
            >
              delete
            </span>
            <span
              onClick={() =>
                this.props.showModal({
                  id: this.props.id,
                  isComplete: this.props.isComplete,
                  todo: this.props.todo,
                  time: this.props.time,
                })
              }
              className="material-symbols-outlined"
            >
              edit
            </span>
          </div>
        </div>
      </>
    );
  }
}
