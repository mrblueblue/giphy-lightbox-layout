import React, { Component } from "react";
import { connect } from "react-redux";
import { requestGifs } from "../actions/gifs-actions";
import { resizeLayout } from "../actions/layout-actions";
import { calculateNumCols } from "../utils/lightbox-layout";
import Image from "../components/Image";
import Scrollable from "./OnScroll";
import debounce from "lodash.debounce";

import "./App.css";

const API_LIMIT = 30;
const RESIZE_INTERVAL = 400;

function mapStateToProps(state, props) {
  return {
    gifs: state.gifs.list,
    layout: state.settings.layout,
    numCols: state.settings.numCols
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestGifs() {
      dispatch(requestGifs({ limit: API_LIMIT }));
    },
    resizeLayout() {
      dispatch(resizeLayout(calculateNumCols()));
    }
  };
}

class App extends Component {
  resizeLayout = debounce(this.props.resizeLayout, RESIZE_INTERVAL);

  componentDidMount() {
    this.props.requestGifs();
    window.addEventListener("resize", this.resizeLayout);
  }

  componentDidUnMount() {
    window.removeEventListener("resize", this.resizeLayout);
  }

  render() {
    return (
      <div className="App">
        <Scrollable onScroll={this.props.requestGifs}>
          <div id="gallery" className="gallery">
            {this.props.layout.map(
              ({ marginTop, marginLeft, width, height }, index) => {
                const gif = this.props.gifs[index];
                return (
                  <div key={index + gif.url}>
                    <Image
                      index={index}
                      preview={gif.preview}
                      url={gif.url}
                      marginTop={marginTop}
                      marginLeft={marginLeft}
                      width={width}
                      height={height}
                    />
                  </div>
                );
              }
            )}
          </div>
        </Scrollable>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
