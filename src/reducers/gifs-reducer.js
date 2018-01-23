import * as ActionTypes from "../constants/action-types";

const initialState = {
  pending: false,
  done: false,
  error: false,
  offset: 0,
  list: []
};

export default function gifsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GIFS_REQUEST:
      if (state.pending) {
        return state;
      } else {
        return {
          ...state,
          pending: true,
          done: false,
          error: false
        };
      }
    case ActionTypes.GIFS_REQUEST_SUCCESS:
      return {
        ...state,
        pending: false,
        done: true,
        error: false,
        list: state.list.concat(action.gifs),
        offset: state.list.length + action.gifs.length
      };
    case ActionTypes.GIFS_REQUEST_FAILURE:
      return {
        ...state,
        pending: false,
        done: true,
        error: true
      };
    default:
      return state;
  }
}
