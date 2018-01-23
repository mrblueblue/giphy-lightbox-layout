import { combineReducers } from "redux";
import gifsReducer from "./gifs-reducer";

import settingsReducer, { initialLayoutState } from "./layout-reducer";

const combined = combineReducers({
  gifs: gifsReducer,
  settings: (state = initialLayoutState) => state
});

export default settingsReducer(combined);
