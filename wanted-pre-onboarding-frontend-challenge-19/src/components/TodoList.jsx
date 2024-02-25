import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../store/todoSlice";

export const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.list);

  const handleRemove = (id) => () => {
    dispatch(removeTodo({ id }));
  };

  return (
    <section>
      {todos.map((item) => (
        <div key={item.id}>
          <span>{item.content}</span>
          <button type="button" onClick={handleRemove(item.id)}>
            삭제
          </button>
        </div>
      ))}
    </section>
  );
};
