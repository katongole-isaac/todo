const validteInput = /^.*[A-za-z\-@~([)%#!\*]+\s*?$/;
const checkForWhiteSpace = /^\s*$/;
import * as constants from './constants';

export default function (todo, thisArg) {
  if (typeof todo !== "string") return false;

  if (checkForWhiteSpace.test(todo) || !validteInput.test(todo)) {
    thisArg.setState({ todo: "" });
    thisArg.setState({ error: true });
    return false;
  }

  if (todo.length < constants.MIN_TODO_TEXT_LENGTH) {
    thisArg.setState({ error: true });
    return false;
  }
  return true;
}
