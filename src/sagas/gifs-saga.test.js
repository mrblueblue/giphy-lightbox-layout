import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { gifsRequestFlow } from "./gifs-saga";
import * as gifsActions from "../actions/gifs-actions";
import * as GiphyAPI from "../services/giphy";

test("gifsRequestFlow", done => {
  const list = [{}, {}];
  expect.assertions(1);
  return expectSaga(gifsRequestFlow)
    .withState({ gifs: { offset: 0 } })
    .dispatch(gifsActions.requestGifs())
    .provide([[matchers.call.fn(GiphyAPI.getGIFS), list]])
    .put(gifsActions.gifsRequestSuccess(list))
    .run()
    .then(() => {
      expect(true).toBe(true);
      done();
    });
});
