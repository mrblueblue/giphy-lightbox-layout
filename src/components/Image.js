import React, { Component } from "react";
import "./Image.css"
const COLORS = ["#f66", "#93f", "#0cf", "#0f9"];

export default class Image extends Component {
  state = {
    loaded: false
  };

  backgroundColor = COLORS[Math.floor(Math.random() * 4)];

  handlePreviewLoad = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { marginTop, marginLeft, width, height } = this.props;
    return (
      <div className="image-container" style={{top: marginTop, left: marginLeft }}>
        <div
          alt=""
          className="color-preview"
          style={{
            position: "absolute",
            backgroundColor: this.backgroundColor,
            width, height
          }}

        />
        <img
          alt=""
          className={`still-preview ${this.state.loaded ? "show": ""}`}
          style={{
            backgroundColor: this.backgroundColor
          }}
          src={this.props.preview}
          width={width}
          height={height}
          onLoad={this.handlePreviewLoad}
        />
        {this.state.loaded ? (
          <img
            alt=""
            className="gif-image"
            src={this.props.url}
            width={width}
            height={height}
          />
        ) : (
          <div />
        )}
      </div>
    );
  }
}
