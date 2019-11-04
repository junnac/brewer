import { RECEIVE_CURRENT_USER, LOG_OUT_CURRENT_USER } from "../actions/session_actions";

const sessionReducer = (oldState = { id: null }, action) => {
  Object.freeze(oldState);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, { id: action.user.id });
    case LOG_OUT_CURRENT_USER:
      return Object.assign({}, { id: null })
    default:
      return oldState;
  }
};

export default sessionReducer;