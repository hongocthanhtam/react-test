import React from "react";
import ColorContext from "./ColorContext";
import LoginContext from "./LoginContext";

class Button extends React.Component {
  render() {
    return (
      <div className="item">
        <ColorContext.Consumer>
          {changBg => (
            <LoginContext.Consumer>
              {onLogin => (
                <button
                  onClick={() => onLogin("hasLogin")}
                  style={{ backgroundColor: changBg.color }}
                >
                  {this.props.button}
                </button>
              )}
            </LoginContext.Consumer>
          )}
        </ColorContext.Consumer>
      </div>
    );
  }
}
export default Button;
