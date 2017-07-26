import React, { Component } from "react";

export default class ImageDisplay extends Component {
  render() {
    let photo = this.props.images.map(image => {
      return (
        <div key={image.id}>
          <div key={image.id}>
            <img src={image.img_src} alt="rover" />
          </div>
        </div>
      );
    });
    return <div>{photo}</div>;
  }
}
