import React from "react";
import { shallow } from "enzyme";
import Image from "./Image";

describe("Image Component", () => {
  const props = {
    marginTop: 0,
    marginLeft: 50,
    width: 200,
    height: 150,
    url: "http://test.com/test.gif"
  };

  let wrapper = shallow(<Image {...props} />);

  test("loaded state", () => {
    expect(wrapper.state().loaded).toEqual(false);
    expect(wrapper.find(".gif-image").length).toEqual(0);
    wrapper
      .find("img")
      .at(0)
      .props()
      .onLoad();
    expect(wrapper.state().loaded).toEqual(true);
    wrapper.setState({ loaded: true });
    expect(wrapper.find(".gif-image").props().src).toEqual(props.url);
  });
});
