import React from "react";
import Home from "./Home";
import "./App.css";
import Login from "./Login";
import LoginContext from "./components/LoginContext";

export default class Parent extends React.Component {
  state = {
    page: "isLogin"
  };
  handleClick = page => {
    this.setState({
      page
    });
  };

  render() {
    if (this.state.page !== "isLogin") {
      return <Home />;
    } else {
      return (
        <LoginContext.Provider value={this.handleClick}>
          <Login />
        </LoginContext.Provider>
      );
    }
  }
}
