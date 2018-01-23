// @flow
export const MARGIN = 5;
export const COLUMN_WIDTH = 200;
export const ROW_INTERVAL = 20;

type randomize = () => boolean;

type Heights = Array<number>;

type Size = {
  width: number,
  height: number
};

type ColumnSpan = [number] | [number, number];

type ColumnDimensions = {
  marginTop: number,
  marginLeft: number,
  width: number,
  height: number,
  cols: ColumnSpan
};

type LayoutGrid = Array<ColumnDimensions>;

type LayoutState = {
  numCols: number,
  heights: Heights,
  layout: LayoutGrid,
  colWidth: number
};

const sixtyfourty = () => {
  if (process.env.NODE_ENV === "test") {
    return false;
  } else {
    return Math.random() > 0.6;
  }
};

export function initializeLayoutState(): LayoutState {
  const totalWidth = window.innerWidth;
  const colWidth =
    totalWidth <= 599 ? totalWidth / 2 - MARGIN * 1.5 : COLUMN_WIDTH;
  const numCols = totalWidth <= 599 ? 2 : calculateNumCols();
  return {
    colWidth,
    numCols,
    heights: Array.from({ length: numCols }, () => 0),
    layout: []
  };
}

export function calculateNumCols() {
  let width = window.innerWidth;
  if (width >= 1200) {
    width = 1200;
  } else if (width >= 900) {
    width = 900;
  } else if (width >= 768) {
    width = 768;
  } else if (width >= 600) {
    width = 410;
  }

  return Math.floor(width / (COLUMN_WIDTH + MARGIN));
}

export function getShortestColumn(heights: Heights): number {
  return heights.reduce((shortest, height, index) => {
    return heights[index] < heights[shortest] ? index : shortest;
  }, 0);
}

export function getColumnSpan(
  heights: Heights,
  randomize: randomize = sixtyfourty
): ColumnSpan {
  const shortestIdx = getShortestColumn(heights);
  if (
    randomize() &&
    heights[shortestIdx] !== 0 &&
    heights[shortestIdx] === heights[shortestIdx + 1]
  ) {
    return [shortestIdx, shortestIdx + 1];
  } else {
    return [shortestIdx];
  }
}

export function getDimensions(
  heights: Heights,
  size: Size,
  columnSpan: ColumnSpan,
  columnWidth: number = COLUMN_WIDTH
): ColumnDimensions {
  const [index] = columnSpan;
  return {
    cols: columnSpan,
    marginTop: heights[index] + MARGIN,
    marginLeft: index * (columnWidth + MARGIN) + MARGIN,
    width:
      columnSpan.length === 2
        ? columnWidth * columnSpan.length + MARGIN
        : columnWidth,
    height: (size.height - size.height % ROW_INTERVAL) * columnSpan.length
  };
}

export function addItemsToLayout(
  state: LayoutState,
  list: Array<Size>
): LayoutState {
  return list.reduce((accum, size, index) => {
    const cols = getColumnSpan(accum.heights);
    const dim = getDimensions(accum.heights, size, cols, accum.colWidth);
    accum.layout.push(dim);
    cols.forEach(idx => (accum.heights[idx] += dim.height + MARGIN));
    return accum;
  }, state);
}
