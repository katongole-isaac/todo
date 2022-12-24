import * as constants from "../utils/constants";

export default class TodoInput extends React.Component {
  render() {
    return (
      <>
        <input
          type="text"
          autoComplete="off"
          value={this.props.todo}
          onChange={(e) => this.props.handleChange(e)}
          className="form-control shadow-none"
          id="todo"
          name="todo"
          aria-describedby="error"
          maxLength={constants.MAX_INPUT_LENGTH}
        />
      </>
    );
  }
}
