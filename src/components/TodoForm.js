import React from "react";
//npm install shortid
import shortid from "shortid";
import axios from "axios";
import PropTypes from "prop-types";

export default class TodoForm extends React.Component {
  //Set state

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      text: ""
    };
  }
  componentDidMount() {
    this.textInput.current.focus();
  }
  // Handle khi submit
  handleSubmit = event => {
    //K load lại trang
    event.preventDefault();
    this.props.onSubmit({
      id: shortid.generate(),
      text: this.textInput.current.value,
      complete: false,
      editing: false
    });
    this.setState({
      textInput: ""
    });
    const text = this.textInput.current.value;
    axios.post(`https://5ce4aac9c1ee360014725c80.mockapi.io/api/todotasks`, {
      text
    });
    // .then(res => {
    // console.log(res);
    // console.log(res.data);
    // });
  };
  render() {
    return (
      <>
        <div className="sub_content">
          <form className="main_form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              ref={this.textInput}
              placeholder="What needs to be done?"
            />
          </form>
        </div>
      </>
    );
  }
}
TodoForm.propTypes = {
  onSubmit: PropTypes.func
};
