import {
  getDimensions,
  getShortestColumn,
  getColumnSpan
} from "./lightbox-layout";

test("getShortestColumn", () => {
  expect(getShortestColumn([3, 5, 2, 3])).toBe(2);
});

test("getColumnSpans", () => {
  expect(getColumnSpan([2, 5, 1, 1], () => true)).toEqual([2, 3]);
  expect(getColumnSpan([2, 5, 7, 1])).toEqual([3]);
});

test("getDimensions", () => {
  expect(
    getDimensions([355, 435, 415, 355, 355], { width: "200", height: "112" }, [
      0
    ])
  ).toEqual({
    cols: [0],
    width: 200,
    height: 100,
    marginTop: 360,
    marginLeft: 5
  });

  expect(
    getDimensions([670, 685, 730, 665, 665], { width: "200", height: "112" }, [
      3,
      4
    ])
  ).toEqual({
    cols: [3, 4],
    width: 405,
    height: 200,
    marginTop: 670,
    marginLeft: 620
  });
});
