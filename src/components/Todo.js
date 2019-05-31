import React, { useState, useContext } from "react";
// import PropTypes from "prop-types";
import TodoContext from "./TodoContext";

export default props => {
  const [textData, setTextData] = useState(props.todo.text);
  const { toggleComplete, onDelete, deleteEdit } = useContext(TodoContext);
  const onChangeHandle = event => {
    setTextData({
      textData: event.target.value
    });
  };
  const handleSubmit = event => {
    event.preventDefault();
    props.editTodoTask(props.todo.id, textData);
  };
  const { todo } = props;
  const { id, text, editing, complete } = props.todo;
  return (
    <div className="sub_content padt50 sub_form">
      <div className="item">
        {editing === true ? (
          <>
            <form className="view_form" onSubmit={handleSubmit}>
              <div className="sub_viewForm view_input input_edit">
                <input name="text" value={textData} onChange={onChangeHandle} />
              </div>
              <div className="sub_viewForm">
                <button
                  type="button"
                  onClick={() => deleteEdit(id)}
                  className="btn btn--icon radis"
                >
                  <i className="material-icons">clear</i>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="view_form">
            <div className="sub_viewForm view_input">
              <button
                type="button"
                className="btn btn--icon radis"
                style={{
                  color: complete ? "#85bf6b" : ""
                }}
                onClick={() => toggleComplete(todo)}
              >
                <i className="material-icons">done</i>
              </button>
              <input
                style={{
                  textDecoration: complete ? "line-through #85bf6b" : "",
                  color: complete ? "#666" : ""
                }}
                id={id}
                type="text"
                value={text}
                disabled
              />
            </div>
            <div className="sub_viewForm">
              {complete !== true ? (
                <button
                  type="button"
                  onClick={() => props.showEditTodoTask(id)}
                  className="btn btn--icon radis"
                >
                  <i className="material-icons">edit</i>
                </button>
              ) : (
                ""
              )}
              <button
                className="btn btn--icon radis"
                onClick={() => {
                  if (window.confirm("Delete the tasks?")) {
                    onDelete(id);
                  }
                }}
              >
                <i className="material-icons">delete</i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
// Todo.propTypes = {
//   todo: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     text: PropTypes.string.isRequired,
//     editing: PropTypes.bool,
//     complete: PropTypes.bool
//   }).isRequired,
//   deleteEdit: PropTypes.func,
//   toggleComplete: PropTypes.func,
//   showEditTodoTask: PropTypes.func,
//   onDelete: PropTypes.func
// };
