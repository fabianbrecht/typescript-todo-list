import { ChangeEvent, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import Todo from "./todo";

interface TodoElementProps {
  todo: Todo;
  uuid: string;
  onChange: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

function TodoElement({ todo, uuid, onChange, onDelete }: TodoElementProps) {
  let timeout = -1;

  const [state, setState] = useState(todo);

  function onChangeCheckbox(e: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, checked: e.target.checked });
    startTimeout({ ...state, checked: e.target.checked });
  }

  function onChangeHeadline(e: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, headline: e.target.value });
    startTimeout({ ...state, headline: e.target.value });
  }

  function onChangeText(e: ChangeEvent<HTMLTextAreaElement>) {
    setState({ ...state, text: e.target.value });
    startTimeout({ ...state, text: e.target.value });
  }

  function startTimeout(changedTodo: Todo) {
    clearTimeout(timeout);
    timeout = setTimeout(() => onChange(changedTodo), 300);
  }

  return (
    <div className="max-w-7xl w-full mx-auto">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500-500 to-blue-500 rounded-lg blur-sm opacity-25 group-hover:opacity-100 group-active:opacity-100 transition duration-1000 group-hover:duration-200 group-active:duration-200"></div>
        <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start justify-items-start space-x-6">
          <div className="flex items-center me-4">
            <input
              id={uuid + "-checkbox"}
              type="checkbox"
              onChange={onChangeCheckbox}
              checked={state.checked}
              className="w-8 h-8 accent-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 dark:focus:ring-cyan-600"
            />
          </div>

          <div className="w-full text-left">
            <div className="flex">
              <input
                className={
                  "flex-1 text-slate-800 block font-bold text-xl rounded-lg w-auto focus:ring-cyan-500 focus:border-cyan-500 p-2.5" +
                  (state.checked ? " line-through" : "")
                }
                defaultValue={state.headline}
                onChange={onChangeHeadline}
              ></input>
              <div
                className="flex-none accent-cyan-600 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-1000 p-2.5 cursor-pointer"
                onClick={() => onDelete(state)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
                  viewBox="0 -960 960 960"
                  width="32"
                  fill="#0891b2"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </div>
            </div>
            <TextareaAutosize
              className={
                "text-slate-800 block text-base rounded-lg w-full focus:ring-cyan-500 focus:border-cyan-500 p-2.5" +
                (state.checked ? " line-through" : "")
              }
              defaultValue={state.text}
              onChange={onChangeText}
            ></TextareaAutosize>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoElement;
