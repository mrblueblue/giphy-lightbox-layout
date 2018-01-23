import higherOrderLayoutReducer from "./layout-reducer";
import { resizeLayout } from "../actions/layout-actions";
import { gifsRequestSuccess } from "../actions/gifs-actions";

describe("layoutReducer", () => {
  const reducer = jest.fn();
  const layoutReducer = higherOrderLayoutReducer(reducer);

  test("handles layout resizing", () => {
    const nextState = layoutReducer(
      {
        settings: {},
        gifs: {
          list: [
            { width: 200, height: 150 },
            { width: 200, height: 150 },
            { width: 200, height: 150 }
          ]
        }
      },
      resizeLayout(2)
    );

    expect(nextState).toEqual({
      gifs: {
        list: [
          { height: 150, width: 200 },
          { height: 150, width: 200 },
          { height: 150, width: 200 }
        ]
      },
      settings: {
        colWidth: 200,
        heights: [145, 145, 145, 0],
        layout: [
          { cols: [0], height: 140, marginLeft: 5, marginTop: 5, width: 200 },
          { cols: [1], height: 140, marginLeft: 210, marginTop: 5, width: 200 },
          { cols: [2], height: 140, marginLeft: 415, marginTop: 5, width: 200 }
        ],
        numCols: 4
      }
    });

    expect(
      layoutReducer(
        nextState,
        gifsRequestSuccess([
          { width: 200, height: 200 },
          { width: 200, height: 210 }
        ])
      )
    ).toEqual({
      settings: {
        colWidth: 200,
        heights: [350, 145, 145, 205],
        layout: [
          { cols: [0], height: 140, marginLeft: 5, marginTop: 5, width: 200 },
          { cols: [1], height: 140, marginLeft: 210, marginTop: 5, width: 200 },
          { cols: [2], height: 140, marginLeft: 415, marginTop: 5, width: 200 },
          { cols: [3], height: 200, marginLeft: 620, marginTop: 5, width: 200 },
          { cols: [0], height: 200, marginLeft: 5, marginTop: 150, width: 200 }
        ],
        numCols: 4
      }
    });
  });
});
