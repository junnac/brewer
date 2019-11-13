import { RECEIVE_ALL_GUIDES, RECEIVE_GUIDE, REMOVE_GUIDE } from '../actions/guide_actions';

const guidesReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  const newState = Object.assign({}, oldState);
  switch (action.type) {
    case RECEIVE_ALL_GUIDES:
      return action.guides;
    case RECEIVE_GUIDE:
      return action.payload.guides
    case REMOVE_GUIDE:
      delete newState[action.guideId];
      return newState;
    default:
      return oldState;
  }
}

export default guidesReducer;