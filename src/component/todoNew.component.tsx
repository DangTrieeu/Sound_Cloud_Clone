import { useState } from "react";
import { IProps } from "./todoList.component";

const TodoNew = (props: IProps) => {
  const [todo, setTodo] = useState("");
  const { todoList, setTodoList } = props;
  const handleClick = (data: string) => {
    if (!data) {
      alert("Please enter a todo item.");
      return;
    }
    console.log("data:" + data);
    const newTodo = {
      id: todoList.length + 1,
      title: data,
    };
    setTodoList([...todoList, newTodo]);
    setTodo("");
  };
  return (
    <div>
      <input
        onChange={(event) => {
          console.log("Input changed: ", event.target.value);
          setTodo(event.target.value);
        }}
        value={todo}
        type="text"
      />
      <button
        onClick={() => {
          handleClick(todo);
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

export default TodoNew;
