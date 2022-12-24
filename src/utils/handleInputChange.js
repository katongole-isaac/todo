import * as constants from "./constants";

export default function (e, thisArg, other) {
  let todo;

  todo = e.target.value;

  thisArg.setState((prev) => {
    return {
      ...prev,
      todo,
      ...other,
      maxInputLength: constants.MAX_INPUT_LENGTH - todo.length,
      error: false,
    };
  });
}
