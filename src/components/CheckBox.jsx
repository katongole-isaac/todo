class CheckBox extends React.Component {
  render() {
    return (
      <>
        <div
          className="checkbox d-flex gap-1 align-items-center"
          style={{ ...this.props.styles }}
        >
          <input
            ref={this.props.checkboxRef}
            value={this.props.complete}
            type="checkbox"
            name="complete"
            id="check"
            onChange={
              !!this.props.handleCheckboxChange
                ? this.props.handleCheckboxChange
                : (e) => this.props.handlecheckboxUpdate(e, this.props.todoId)
            }
          />
          <label>{this.props.checkboxLabel} </label>
        </div>
      </>
    );
  }
}

export default CheckBox;
