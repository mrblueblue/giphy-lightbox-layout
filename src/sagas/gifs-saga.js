import { call, put, select, take } from "redux-saga/effects";
import * as ActionTypes from "../constants/action-types";
import * as gifsActions from "../actions/gifs-actions";
import * as GiphyAPI from "../services/giphy";

export function* gifsRequestFlow() {
  try {
    const offset = yield select(state => state.gifs.offset);
    const { params } = yield take(ActionTypes.GIFS_REQUEST);
    const gifs = yield call(GiphyAPI.getGIFS, {
      ...GiphyAPI.defaultParams,
      ...params,
      offset
    });
    yield put(gifsActions.gifsRequestSuccess(gifs));
  } catch (e) {
    yield put(gifsActions.gifsRequestFailure(e));
  }
}

export default function* gifsSaga() {
  while (true) {
    yield* gifsRequestFlow();
  }
}
