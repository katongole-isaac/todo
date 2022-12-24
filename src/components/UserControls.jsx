import CheckBox from "./CheckBox";
import FullInputField from "./FullInputField";

export default class UserControls extends React.Component {
  render() {
    return (
      <>
        <div className=" user-controls  ">
          <form onSubmit={(e) => this.props.handleSubmit(e)}>
            <FullInputField
              todo={this.props.todo}
              handleChange={this.props.handleChange}
              error={this.props.error}
              maxInputLength={this.props.maxInputLength}
            />

            <div className="d-flex gap-2">
              <input
                type="submit"
                value="Add Todo"
                className="btn btn-sm btn-primary add-todo-btn"
              />
              <CheckBox
                checkboxRef={this.props.checkboxRef}
                value={this.props.complete}
                checkboxLabel="Complete"
                handleCheckboxChange={(e) => this.props.handleCheckboxChange(e)}
              />
            </div>
          </form>
        </div>
      </>
    );
  }
}
