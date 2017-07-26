import React, { Component } from "react";
import GetImageButton from "./GetImageButton";
import ImageDisplay from "./ImageDisplay";
const API_KEY = "2L8JfNmHBHzzZ9rrMZZrzIScYZLDsb5bmQjffLP3";

export default class GetImageForm extends Component {
  constructor(props) {
    super(props);

    this.handleRover = this.handleRover.bind(this);
    this.handleCamera = this.handleCamera.bind(this);
    this.handleSol = this.handleSol.bind(this);

    this.state = {
      rover: "Curiosity",
      camera: "FHAZ",
      images: [],
      sol: ""
    };
  }
  handleRover(e) {
    var rover = this.state.rover;
    rover = e.target.value;
    this.setState({ rover });
  }
  handleCamera(e) {
    var camera = this.state.camera;
    camera = e.target.value;
    this.setState({ camera });
  }
  handleSol(e) {
    var sol = this.state.songArtist;
    sol = e.target.value;
    this.setState({ sol });
  }

  fetchRoverImage = e => {
    this.setState({
      camera: this.state.camera,
      rover: this.state.rover,
      sol: this.state.sol
    });
    let cam = this.state.camera;
    let rove = this.state.rover;
    let num = this.state.sol;

    let imageUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rove}/photos?sol=${num}&camera=${cam}&api_key=${API_KEY}`;
    fetch(imageUrl)
      .then(results => {
        return results.json();
      })
      .then(data => {
        const images = data;

        this.setState({
          images: data.photos
        });
        console.log("state", this.state.images);
        console.log(images);
      });
  };

  render() {
    return (
      <div>
        <label htmlFor="rover">Rover</label>
        <select onChange={this.handleRover} id="rover" value={this.state.rover}>
          <option value="Curiosity">Curiosity</option>
          <option value="Opportunity">Opportunity</option>
          <option value="Spirit">Spirt</option>
        </select>
        <label htmlFor="camera">Camera Type</label>
        <select
          onChange={this.handleCamera}
          id="rover"
          value={this.state.camera}
        >
          <option value="fhaz">FHAZ (Front Hazard)</option>
          <option value="rhaz">RHAZ (Rear Hazard)</option>
          <option value="navcam">NAVCAM (Navigation Cam)</option>
        </select>
        <label htmlFor="sol">Martian Sol: 1000-2000</label>
        <input
          type="number"
          onChange={this.handleSol}
          max="2000"
          min="1000"
          value={this.state.sol}
        />
        {this.state.rover}
        <GetImageButton onClick={this.fetchRoverImage} />
        <ImageDisplay images={this.state.images} />

      </div>
    );
  }
}
