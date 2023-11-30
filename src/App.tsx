import { useState } from "react";
import Todo from "./todo/todo";
import "./App.css";

import TodoElement from "./todo/TodoElement";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useState(() => {
    const storageContent = localStorage.getItem("todos");
    setTodos(storageContent ? JSON.parse(storageContent) : []);
  });

  function addTodo() {
    setTodos([...todos, new Todo()]);
  }

  function onChange(changedTodo: Todo) {
    let index = todos.findIndex((t) => t.uuid === changedTodo.uuid);
    todos[index] = changedTodo;
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("stored: ", changedTodo);
  }

  function onDelete(changedTodo: Todo) {
    let changedTodos = todos.filter((t) => t.uuid !== changedTodo.uuid);
    setTodos(changedTodos);
    localStorage.setItem("todos", JSON.stringify(changedTodos));
    console.log("removed: ", changedTodo);
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {todos.map((todo) => {
          return (
            <TodoElement
              todo={todo}
              uuid={todo.uuid}
              key={todo.uuid}
              onChange={onChange}
              onDelete={onDelete}
            ></TodoElement>
          );
        })}
        <div className="flex items-start mt-8">
          <button
            type="button"
            className="text-white font-bold bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-500 rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={addTodo}
          >
            Add Todo
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
