import { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo } from "./store/todoSlice";

function App() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.list);

  const handleTodo = (e) => {
    console.log(e.target.value);

    setValue(e.target.value);
  };
  console.log(value);
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

  const handleRemove = (id) => () => {
    dispatch(removeTodo({ id }));
  };

  return (
    <div className="app">
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
    </div>
  );
}

export default App;
