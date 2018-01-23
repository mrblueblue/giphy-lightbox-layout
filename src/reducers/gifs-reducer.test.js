import gifsReducer from "./gifs-reducer";
import * as gifsActions from "../actions/gifs-actions";

describe("gifsReducer", () => {
  test("handles GIFS_REQUEST", () => {
    expect(
      gifsReducer(
        {
          pending: false,
          done: true,
          error: false,
          offset: 0,
          list: []
        },
        gifsActions.requestGifs()
      )
    ).toEqual({
      pending: true,
      done: false,
      error: false,
      offset: 0,
      list: []
    });
  });

  test("handles GIFS_REQUEST_SUCCESS", () => {
    const gifs = [{}, {}];
    expect(
      gifsReducer(
        {
          pending: false,
          done: true,
          error: false,
          offset: 0,
          list: []
        },
        gifsActions.gifsRequestSuccess(gifs)
      )
    ).toEqual({
      pending: false,
      done: true,
      error: false,
      offset: gifs.length,
      list: gifs
    });
  });

  test("handles GIFS_REQUEST_FAILURE", () => {
    expect(
      gifsReducer(
        {
          pending: false,
          done: true,
          error: false,
          offset: 0,
          list: []
        },
        gifsActions.gifsRequestFailure()
      )
    ).toEqual({
      pending: false,
      done: true,
      error: true,
      offset: 0,
      list: []
    });
  });
});
