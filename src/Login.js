import React from "react";
import Button from "./components/Button";
import changeColor from "./img/changeIcon.jpg";
import ColorContext from "./components/ColorContext";

class Login extends React.Component {
  state = {
    button: ["GitHub", "Google", "Twiter"],
    st: ""
  };
  render() {
    return (
      <div className="login">
        <div className="item padb50">Sign in</div>
        {this.state.button.map((btn, key) => {
          return <Button key={key} button={btn} onLogin={this.props.onLogin} />;
        })}
        <ColorContext.Consumer>
          {value => (
            <img
              className="changeColor"
              src={changeColor}
              alt="htactive"
              width="21"
              height="21"
              onClick={() => value.function(this.state.st)}
            />
          )}
        </ColorContext.Consumer>
      </div>
    );
  }
}
export default Login;
