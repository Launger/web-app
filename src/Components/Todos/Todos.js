import React, { useState, useEffect, useRef } from "react";
import { useStore } from "react-hookstore";
import { v4 as uuidv4 } from "uuid";

import Tooltip from "../Tooltip/Tooltip";

import "./Todos.css";
import { formatTime } from "Utils";

const Todos = ({ speedrun = false }) => {
  const [todos, setTodos] = useStore("todos");
  const [timer] = useStore("timer");
  const [totalTime, setTotalTime] = useStore("totalTime");

  const firstNotCompletedTodo = todos.find(todo => !todo.completed);

  const [focusedTodo, setFocusedTodo] = useState(firstNotCompletedTodo || todos[0]);
  const [isComponentInFocus, setIsComponentInFocus] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [title, setTitle] = useState("");
  const [expectedTime, setExpectedTime] = useState("");

  const componentElement = useRef(null);
  const dropdownElement = useRef(null);

  //AddTodo logic:
  const handleSubmit = e => {
    e.preventDefault();
    if (title !== "") {
      let t = parseInt(expectedTime);
      if (isNaN(t)) {
        t = 5;
      }
      const newTodo = {
        id: uuidv4(),
        title: title,
        completed: false,
        timeSpentOnIt: 0,
        expectedTime: t,
      };
      setTodos([...todos, newTodo]);
      sessionStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
      if (todos.length === 0) {
        setFocusedTodo(newTodo);
      }
      setTotalTime(totalTime + t);
    }
    setTitle("");
    setExpectedTime("");
  };

  // FocusedTodo logic & Todos logic:
  const completeTodo = id => {
    const newTodos = todos.slice();
    newTodos.forEach(todo => {
      if (todo.id === id) todo.completed = !todo.completed;
    });
    setTodos(newTodos);
    sessionStorage.setItem("todos", JSON.stringify(newTodos));
    if (id === focusedTodo.id) {
      const nextNotCompletedTodo = todos.find(todo => !todo.completed);
      setFocusedTodo(nextNotCompletedTodo || todos[0]); //Add take a break message if all complete
    }
  };

  const handleEdit = (e, id) => {
    const newTodos = todos.slice();
    newTodos.forEach(todo => {
      if (todo.id === id) todo.title = e.target.value;
    });
    setTodos(newTodos);
    sessionStorage.setItem("todos", JSON.stringify(newTodos));
    if (id === focusedTodo.id) {
      setFocusedTodo({ ...focusedTodo, title: e.target.value });
    }
  };

  const handleEditExpectedTime = (e, id) => {
    const newTime = parseInt(e.target.value);
    if (!isNaN(newTime)) {
      const newTodos = todos.slice();
      newTodos.forEach(todo => {
        if (todo.id === id) todo.expectedTime = newTime;
      });
      setTodos(newTodos);
      sessionStorage.setItem("todos", JSON.stringify(newTodos));
      if (id === focusedTodo.id) {
        setFocusedTodo({ ...focusedTodo, expectedTime: newTime });
      }
    }
  };

  const focusOnTask = todo => {
    setFocusedTodo(todo);
    setIsComponentInFocus(false);
  };

  const handleFinishEdit = e => {
    if (speedrun) setTotalTime(todos.reduce((sum, todo) => sum + todo.expectedTime, 0));
    e.preventDefault();
    setIsComponentInFocus(false);
  };

  const deleteTodo = id => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    sessionStorage.setItem("todos", JSON.stringify(newTodos));

    const newFocus = newTodos.find(todo => !todo.completed);
    setFocusedTodo(newFocus || newTodos[0]);
    if (speedrun) setTotalTime(newTodos.reduce((sum, todo) => sum + todo.expectedTime, 0));
  };

  // Detect outside clicks / unfocus Todos component
  useEffect(() => {
    const handleClickOutside = e => {
      if (componentElement.current && !componentElement.current.contains(e.target)) {
        handleSubmit(e);
        setIsComponentInFocus(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line
  }, [componentElement, title, expectedTime]);

  // dropdown when in focus, else no dropdown
  useEffect(() => {
    if (isComponentInFocus) {
      setDropdownStyle({});
      let count = 0;
      todos.forEach(todo => {
        if (todo.completed) count++;
      });
      dropdownElement.current.scroll(0, count * 20);
    } else {
      setDropdownStyle({
        opacity: "0",
        transform: "translateY(-100%)",
      });
    }
    // eslint-disable-next-line
  }, [isComponentInFocus]);

  useEffect(() => {
    setFocusedTodo(fTodo => {
      const newTimeSpentOnIt = fTodo && fTodo.timeSpentOnIt + 1;
      if (((fTodo && fTodo.previousUpdate) || 25 * 60) !== timer.time) {
        return {
          ...fTodo,
          timeSpentOnIt: newTimeSpentOnIt,
          previousUpdate: timer.time,
        };
      } else {
        return { ...fTodo }; //FIXME: remove unecessary update (currently updates whole page every 0.5s)
      }
    });
    // eslint-disable-next-line
  }, [timer.time]);

  useEffect(() => {
    const newTodos = todos.slice();
    newTodos.forEach(newTodo => {
      if (newTodo.id === focusedTodo.id) {
        newTodo.timeSpentOnIt = focusedTodo.timeSpentOnIt;
      }
    });
    setTodos(newTodos);
    sessionStorage.setItem("todos", JSON.stringify(newTodos));
    // eslint-disable-next-line
  }, [focusedTodo]);

  return (
    <div className="Todos" ref={componentElement}>
      <div className="main-tooltip" style={isComponentInFocus && todos.length === 0 ? { opacity: "1" } : {}}>
        <Tooltip text="You are more likely to complete your task if you write it down." pointing="bottom" />
      </div>
      <div className="TodoForm">
        {isComponentInFocus || todos.length === 0 ? (
          <form className="AddTodo" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={e => setTitle(e.target.value)}
              value={title}
              placeholder={todos.length === 0 ? "Add a To-do" : "Add another"}
              onFocus={() => setIsComponentInFocus(true)}
              autoFocus
            />
            {speedrun && (
              <label>
                <input type="text" onChange={e => setExpectedTime(e.target.value)} value={expectedTime} placeholder="5" />
                min
              </label>
            )}
            <input type="submit" style={{ display: "none" }} />
            <svg
              className="actionable"
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleSubmit}
            >
              <path
                d="M16.432 8.624C16.744 8.624 17.008 8.732 17.224 8.948C17.464 9.164 17.584 9.428 17.584 9.74C17.584 10.052 17.476 10.328 17.26 10.568C17.044 10.784 16.768 10.892 16.432 10.892H9.91596V17.372C9.91596 17.708 9.80796 17.984 9.59196 18.2C9.37596 18.416 9.11196 18.524 8.79996 18.524C8.48796 18.524 8.22396 18.416 8.00796 18.2C7.79196 17.96 7.68396 17.684 7.68396 17.372V10.892H1.16796C0.855957 10.892 0.579957 10.784 0.339957 10.568C0.123957 10.328 0.0159571 10.052 0.0159571 9.74C0.0159571 9.428 0.123957 9.164 0.339957 8.948C0.579957 8.732 0.855957 8.624 1.16796 8.624H7.68396V2.144C7.68396 1.808 7.79196 1.532 8.00796 1.316C8.22396 1.076 8.48796 0.955998 8.79996 0.955998C9.11196 0.955998 9.37596 1.076 9.59196 1.316C9.80796 1.532 9.91596 1.808 9.91596 2.144V8.624H16.432Z"
                fill="var(--secondary-text-color)"
              />
            </svg>
          </form>
        ) : (
          <div className="FocusedTodo" key={focusedTodo.id} onClick={() => setIsComponentInFocus(true)}>
            <input type="checkbox" checked={focusedTodo.completed} onChange={() => completeTodo(focusedTodo.id)} />
            <input type="text" value={focusedTodo.title} onChange={e => handleEdit(e, focusedTodo.id)} />
            <span style={!speedrun ? { position: "relative", left: "50px" } : {}}>{formatTime(focusedTodo.timeSpentOnIt)}</span>
            {speedrun && (
              <label>
                /
                <input
                  type="text"
                  value={focusedTodo.expectedTime < 10 ? "0" + focusedTodo.expectedTime : focusedTodo.expectedTime}
                  onChange={e => handleEditExpectedTime(e, focusedTodo.id)}
                />
                :00
              </label>
            )}
            <svg className="actionable" width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.721692 1.05223C1.12014 0.653774 1.76616 0.653773 2.16462 1.05223L11.2171 10.1047L9.77416 11.5476L0.721691 2.49515C0.323238 2.0967 0.323239 1.45068 0.721692 1.05223Z"
                fill="var(--secondary-text-color)"
              />
              <path
                d="M18.8244 1.05061C19.2229 1.44906 19.2229 2.09508 18.8244 2.49353L9.77196 11.546L8.32904 10.1031L17.3815 1.05061C17.78 0.652156 18.426 0.652157 18.8244 1.05061Z"
                fill="var(--secondary-text-color)"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="transitionWrapper">
        <div className="TodoDropdown" style={dropdownStyle} ref={dropdownElement}>
          {todos.map(todo => {
            return (
              <form className="todo" key={todo.id} onSubmit={handleFinishEdit}>
                <label className="actionable">
                  <input type="button" value="↑" onClick={() => focusOnTask(todo)} tabIndex="-1" style={{ display: "none" }} />
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={todo.id === focusedTodo.id ? { opacity: "0" } : {}}
                  >
                    <path
                      d="M4.35355 0.646446C4.15829 0.451184 3.84171 0.451184 3.64645 0.646446L0.464466 3.82843C0.269204 4.02369 0.269204 4.34027 0.464466 4.53553C0.659728 4.7308 0.976311 4.7308 1.17157 4.53553L4 1.70711L6.82843 4.53553C7.02369 4.7308 7.34027 4.7308 7.53553 4.53553C7.7308 4.34027 7.7308 4.02369 7.53553 3.82843L4.35355 0.646446ZM4.5 12L4.5 1H3.5L3.5 12H4.5Z"
                      fill="var(--primary-text-color, blue)"
                    />
                  </svg>
                  <div className="focus-tooltip" style={todo.id === focusedTodo.id ? { display: "none" } : {}}>
                    <Tooltip text="Focus on this task" pointing="left" />
                  </div>
                </label>
                <input type="checkbox" checked={todo.completed} onChange={() => completeTodo(todo.id)} tabIndex="-1" />
                <input type="text" value={todo.title} onChange={e => handleEdit(e, todo.id)} />
                <span style={!speedrun ? { position: "relative", left: "50px" } : {}}>{formatTime(todo.timeSpentOnIt)}</span>
                {speedrun && (
                  <label>
                    /
                    <input
                      type="text"
                      value={todo.expectedTime < 10 ? "0" + todo.expectedTime : todo.expectedTime}
                      onChange={e => handleEditExpectedTime(e, todo.id)}
                    />
                    :00
                  </label>
                )}
                <input type="submit" style={{ display: "none" }} />
                <svg
                  className="actionable"
                  fill="var(--secondary-text-color)"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="20px"
                  height="20px"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <path d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z" />
                </svg>
              </form>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Todos;
