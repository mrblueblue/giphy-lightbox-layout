import * as ActionTypes from "../constants/action-types";

export function requestGifs(params) {
  return {
    type: ActionTypes.GIFS_REQUEST,
    params
  };
}

export function gifsRequestSuccess(gifs) {
  return {
    type: ActionTypes.GIFS_REQUEST_SUCCESS,
    gifs
  };
}

export function gifsRequestFailure(error) {
  return {
    type: ActionTypes.GIFS_REQUEST_FAILURE,
    error
  };
}
