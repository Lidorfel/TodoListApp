import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";

uuidv4();

function TodoWrapper() {
  const [todos, setTodos] = useState([]);
  const colorsDict = {
    "0": "mod1",
    "1": "mod2",
    "2": "mod3",
    "3": "mod4",
  };
  useEffect(() => {
    if (localStorage.getItem("Todos")) {
      const storedList = JSON.parse(localStorage.getItem("Todos"));
      setTodos(storedList);
    }
  }, []);
  const addTodo = (todo) => {
    const newTodo = {
      id: uuidv4(),
      task: todo,
      completed: false,
      isEditing: false,
    };
    setTodos([...todos, newTodo]);
    localStorage.setItem("Todos", JSON.stringify([...todos, newTodo]));
  };
  const toggleComplete = (id) => {
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTodos(newTodos);
    localStorage.setItem("Todos", JSON.stringify(newTodos));
  };
  const deleteTodo = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    localStorage.setItem("Todos", JSON.stringify(newTodos));
  };
  const editTodo = (id) => {
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isEditing: !item.isEditing } : item
    );
    setTodos(newTodos);
    localStorage.setItem("Todos", JSON.stringify(newTodos));
  };
  const editTask = (task, id) => {
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, task, isEditing: !item.isEditing } : item
    );
    setTodos(newTodos);
    localStorage.setItem("Todos", JSON.stringify(newTodos));
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            todo={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            color={colorsDict[(index % 4).toString()]}
          />
        )
      )}
    </div>
  );
}

export default TodoWrapper;
