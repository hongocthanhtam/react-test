import React from "react";
import Parent from "./Parent";
import Header from "./Header";
import ColorContext from "./components/ColorContext";

class App extends React.Component {
  state = {
    // bgColor: ["red", "yellow", "blue", "green", "purple", "pink"],
    color: ""
  };
  change = () => {
    // let bgColors = this.state.bgColor;
    // const color = bgColors[Math.floor(Math.random() * bgColors.length)];
    this.state.color = "#fff";
    this.setState({
      color
    });
  };
  render() {
    return (
      <div className="container">
        <ColorContext.Provider
          value={{ color: this.state.color, function: this.change }}
        >
          <Header />
          <Parent />
        </ColorContext.Provider>
      </div>
    );
  }
}

export default App;
