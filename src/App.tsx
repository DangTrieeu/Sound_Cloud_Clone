import { useState } from "react";
import "./App.css";
import TodoNew from "./component/todoNew.component";
import TodoList from "./component/todoList.component";

function App() {
  interface ITodo {
    id: number;
    title: string;
  }
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  return (
    <>
      <div>
        <h1>Add new todo</h1>
      </div>
      <TodoNew todoList={todoList} setTodoList={setTodoList} />
      <TodoList todoList={todoList} />
    </>
  );
}

export default App;
