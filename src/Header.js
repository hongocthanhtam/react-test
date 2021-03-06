import React from "react";
import circle from "./img/circle_icon.png";
import github from "./img/github_icon.png";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="item">
          <img
            className="circle"
            src={circle}
            alt="htactive"
            width="16"
            height="16"
          />
          <div className="title">Todo React Redux</div>
        </div>
        <div className="item">
          <a
            style={{ cursor: "point" }}
            href="https://github.com/hongocthanhtam/react-test"
            target="__blank"
          >
            <img
              className="githubIcon"
              src={github}
              alt="htactive"
              width="21"
              height="21"
            />
          </a>
        </div>
      </div>
    );
  }
}
export default Header;
