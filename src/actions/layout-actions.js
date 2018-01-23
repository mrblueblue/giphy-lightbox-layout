import * as ActionTypes from "../constants/action-types";

export function resizeLayout(numCols) {
  return {
    type: ActionTypes.RESIZE_LAYOUT,
    numCols
  };
}
