import React from "react";
import debouncedRAF from "../utils/debounced-raf";

export default class OnScroll extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = debouncedRAF(this.handleScroll);
  }

  handleScroll = () => {
    const { body, documentElement } = document;
    const windowHeight = documentElement.offsetHeight;
    const docHeight = body.scrollHeight;
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.props.onScroll();
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return this.props.children;
  }
}
