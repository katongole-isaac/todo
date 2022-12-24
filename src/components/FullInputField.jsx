import * as constants from "../utils/constants";
import TodoInput from "./TodoInput";

export default class FullInputField extends React.Component {
  render() {
    return (
      <>
        <div className="form-group">
          <TodoInput
            todo={this.props.todo}
            handleChange={this.props.handleChange}
          />

          <div className="d-flex justify-content-between mb-1 ">
            <small id="error" className="form-text  text-danger">
              {this.props.error && (
                <>
                  todo should contain atleast 5 char(s) and symbols [ -@~([%#!\*
                  ]
                </>
              )}
            </small>

            <small className="text-muted   ">
              {this.props.maxInputLength}/{constants.MAX_INPUT_LENGTH}
            </small>
          </div>
        </div>
      </>
    );
  }
}
