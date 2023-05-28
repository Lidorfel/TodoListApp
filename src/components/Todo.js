import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
function Todo({ todo, toggleComplete, deleteTodo, editTodo, color }) {
  return (
    <div className={"Todo" + " " + color}>
      <p
        onClick={() => toggleComplete(todo.id)}
        className={todo.completed ? "completed" : ""}
      >
        {todo.task}
      </p>
      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          onClick={() => editTodo(todo.id)}
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => {
            deleteTodo(todo.id);
            console.log("deleted");
          }}
        />
      </div>
    </div>
  );
}

export default Todo;
