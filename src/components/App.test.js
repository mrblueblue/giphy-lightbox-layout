import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";

import { requestGifs } from "../actions/gifs-actions";
import { resizeLayout } from "../actions/layout-actions";
import { calculateNumCols } from "../utils/lightbox-layout";

import App from "./App";
import Image from "../components/Image";

describe("App Component", () => {
  const state = {
    gifs: {
      list: [
        {
          url: "test",
          preview: "test"
        },
        {
          url: "test",
          preview: "test"
        }
      ]
    },
    settings: {
      layout: [
        {
          marginTop: 0,
          marginLeft: 0,
          width: 200,
          height: 150
        },
        {
          marginTop: 0,
          marginLeft: 205,
          width: 200,
          height: 150
        }
      ],
      numCols: 2
    }
  };

  const store = {
    getState: () => state,
    subscribe: () => {},
    dispatch: jest.fn()
  };

  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );

  test("componentDidMount", () => {
    expect(store.dispatch).toHaveBeenCalledWith(requestGifs({ limit: 30 }));
  });

  test("render", () => {
    expect(wrapper.find(Image).length).toEqual(state.settings.layout.length);
  });
});
