export interface IProps {
  todoList: { id: number; title: string }[];
  setTodoList?: (value: string[], data: { id: number; title: string }) => void;
}

const TodoList = (props: IProps) => {
  return (
    console.log(props),
    (
      <div>
        <h2>Todo List</h2>
        <ul>
          {props.todoList.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    )
  );
};

export default TodoList;
