import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../store/todoSlice";

export const AddTodo = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.list);

  const handleTodo = (e) => {
    setValue(e.target.value);
  };

  const handleAdd = () => {
    if (!value) {
      alert("값을 입력해야쥬");
    }
    const sendForm = {
      id: todos.length + 1,
      content: value,
    };
    dispatch(addTodo(sendForm));
    setValue("");
  };
  return (
    <section>
      <input
        type="text"
        placeholder="오늘 할 일을 입력하세요."
        value={value}
        onChange={handleTodo}
      />
      <button type="button" onClick={handleAdd}>
        추가
      </button>
    </section>
  );
};
