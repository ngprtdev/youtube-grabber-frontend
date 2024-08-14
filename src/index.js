import React, { Component } from "react";
import ReactDOM from "react-dom";
import Grabber from "./Grabber";
class App extends Component {
  render() {
    return <Grabber />;
  }
}

ReactDOM.render(
  React.createElement(App, {}, null),
  document.getElementById("react-target")
);
