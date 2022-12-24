import { createRef } from "react";
import CheckBox from "./CheckBox";
import * as constants from "../utils/constants";
import handleInputChange from "../utils/handleInputChange";
import FullInputField from "./FullInputField";

export default class UpdateModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: "",
      isComplete: false,
      checkForUpdates: false,
      maxInputLength: constants.MAX_INPUT_LENGTH,
      error: false,
    };
    this.updateCheckboxRef = createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.todo?.id !== prevProps.todo?.id)
      this.setState({ ...this.props.todo });

    if (this.state.isComplete) this.updateCheckboxRef.current.checked = true;
    else this.updateCheckboxRef.current.checked = false;
  }

  handleUpdateTextChange = (e) => {
    handleInputChange(e, this, { checkForUpdates: true });
  };

  handleUpdateCheckbox = (e) => {
    this.setState({
      isComplete: e.target.checked,
      checkForUpdates: true,
    });
  };

  render() {
    return (
      <>
        <div
          className="modal fade "
          id="staticBackdrop"
          tabIndex="-1"
          ref={this.props.modalRef}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="d-flex justify-content-between p-2">
                <h5 className="modal-title">Update Todo</h5>
                <button
                  type="button"
                  className="close btn btn-sm close-btn"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.props.hideModal}
                >
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </div>
              <div className="modal-body">
                <div className="p-2  d-flex flex-column">
                  <p className="mb-1">Title</p>
                  <FullInputField
                    todo={this.state.todo}
                    handleChange={this.handleUpdateTextChange}
                    error={this.state.error}
                    maxInputLength={this.state.maxInputLength}
                  />
                </div>
                <div className="p-2  d-flex flex-column">
                  <p>Status</p>
                  <CheckBox
                    checkboxRef={this.updateCheckboxRef}
                    complete={this.state.isComplete}
                    checkboxLabel="Complete"
                    handleCheckboxChange={this.handleUpdateCheckbox}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  data-dismiss="modal"
                  onClick={this.props.hideModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  disabled={!this.state.checkForUpdates}
                  onClick={() =>
                    this.props.handleUpdateTodo({
                      id: this.props.todo.id,
                      todo: this.state.todo,
                      isComplete: this.state.isComplete,
                      hideModal: this.props.hideModal,
                      updateModalThis: this,
                    })
                  }
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
