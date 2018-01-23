import * as ActionTypes from "../constants/action-types";
import * as layoutUtils from "../utils/lightbox-layout";

export const initialLayoutState = layoutUtils.initializeLayoutState();

export default function higherOrderLayoutReducer(reducer) {
  return function layoutReducer(state, action) {
    switch (action.type) {
      case ActionTypes.RESIZE_LAYOUT:
        return {
          ...state,
          settings: layoutUtils.addItemsToLayout(
            {
              ...layoutUtils.initializeLayoutState()
            },
            state.gifs.list
          )
        };
      case ActionTypes.GIFS_REQUEST_SUCCESS:
        return {
          ...reducer(state, action),
          settings: layoutUtils.addItemsToLayout(state.settings, action.gifs)
        };
      default:
        return reducer(state, action);
    }
  };
}
