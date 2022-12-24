import * as constants from "../utils/constants";

export default class TodoHeader extends React.Component {
  render() {
    return (
      <>
        <div className="d-flex todo-header-controls justify-content-end ">
          <div className="dropdown m-1 ">
            <div className="dropdown-select p-2 d-flex justify-content-between bg-light">
              <span>{this.props.status}</span>
              <span
                className={`material-symbols-outlined ${
                  this.props.arrowClicked && "dropdown-arrow"
                }`}
                onClick={this.props.handleDropdownClick}
              >
                arrow_drop_down
              </span>
            </div>
            <div
              className={`dropdown-options bg-light ${
                this.props.arrowClicked ? "active" : ""
              }  `}
              ref={this.props.dropDownRef}
            >
              {constants.TODO_STATUS.map((status) => (
                <div key={status} className="dropdown-item py-1">
                  <input
                    type="radio"
                    name="status"
                    id=""
                    value={status}
                    className="radio"
                    onChange={(e) => this.props.handleStatusChange(e)}
                  />
                  <span className="p-2 "> {status} </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}
