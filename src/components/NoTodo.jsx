export default class NoTodo extends React.Component {
  render() {
    return (
      <>
        <div
          className=" m-2 p-1  h-25 d-flex align-items-center justify-content-center "
          style={{ fontWeight: "500", fontSize: "25px" }}
        >
          <p className="p-2 bg-light rounded"> No Todos</p>
        </div>
      </>
    );
  }
}
