import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import axios from "axios";
import TodoForm from "./TodoForm";
import ErrorBoundary from "./ErrorBoundary";
import TodoContext from "./TodoContext";
import API from "";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todoToShow, setTodoToShow] = useState("all");
  useEffect(() => {
    const instance = axios.create({});
    instance
      .get(`https://5ce4aac9c1ee360014725c80.mockapi.io/api/todotasks`)
      .then(res => {
        setTodos(res.data.sort((a, b) => b.id - a.id));
      });
  }, []);
  const addTodo = todo => {
    setTodos([todo, ...todos]);
  };
  const toggleComplete = todo => {
    const todotasks = {
      complete: !todo.complete
    };
    const instance = axios.create({});
    instance.put(
      `https://5ce4aac9c1ee360014725c80.mockapi.io/api/todotasks/${todo.id}`,
      todotasks
    );
    // .then(res => console.log(res.data));
    setTodos(
      todos.map(t => {
        if (t.id === todo.id) {
          return {
            ...t,
            complete: !t.complete
          };
        } else {
          return t;
        }
      })
    );
  };
  const updateTodoToShow = text => {
    setTodoToShow(text);
  };
  const handleDeleteTodo = async id => {
    setTodos(todos.filter(todo => todo.id !== id));
    const instance = axios.create({});
    instance.delete(
      `https://5ce4aac9c1ee360014725c80.mockapi.io/api/todotasks/${id}`
    );
    // await API.delete(`todotasks/${id}`);
    // console.log(response);
  };
  const showEditTodoTask = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            editing: true
          };
        } else {
          return todo;
        }
      })
    );
  };
  const editTodoTask = (id, editText) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            text: editText,
            editing: false
          };
        } else {
          return todo;
        }
      })
    );
    const todotasks = {
      text: editText
    };
    const instance = axios.create({});
    instance.put(
      `https://5ce4aac9c1ee360014725c80.mockapi.io/api/todotasks/${id}`,
      todotasks
    );
  };
  const deleteEdit = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            editing: false
          };
        } else {
          return todo;
        }
      })
    );
  };
  const filter = () => {
    if (todoToShow === "all") {
      return todos;
    } else if (todoToShow === "active") {
      return todos.filter(todo => !todo.complete);
    } else if (todoToShow === "complete") {
      return todos.filter(todo => todo.complete);
    }
  };
  return (
    <div className="content">
      <TodoForm onSubmit={addTodo} />
      <div className="sub_content">
        <ul>
          <li
            style={{
              color: todoToShow === "all" ? "#fff" : "#666"
            }}
            className="cursor"
            onClick={() => updateTodoToShow("all")}
          >
            All
          </li>
          <li
            style={{
              color: todoToShow === "active" ? "#fff" : "#666"
            }}
            className="cursor"
            onClick={() => updateTodoToShow("active")}
          >
            Active
          </li>
          <li
            style={{
              color: todoToShow === "complete" ? "#fff" : "#666"
            }}
            className="cursor"
            onClick={() => updateTodoToShow("complete")}
          >
            Completed
          </li>
        </ul>
      </div>
      <ErrorBoundary>
        <TodoContext.Provider
          value={{
            toggleComplete,
            onDelete: handleDeleteTodo,
            deleteEdit
          }}
        >
          {filter().map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              showEditTodoTask={showEditTodoTask}
              editTodoTask={editTodoTask}
            />
          ))}
        </TodoContext.Provider>
      </ErrorBoundary>
    </div>
  );
}
