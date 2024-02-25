import { useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const [value, setValue] = useState("");
  const todos = useSelector((state) => state.todo.list);

  const handleTodo = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className="app">
      <section>
        <input type="text" defaultValue={value} onBlur={handleTodo} />
        <button type="button">추가</button>
      </section>
      <section>
        {todos.map((item) => (
          <div key={item.id}>
            <p>{item.content}</p>
            <button type="button">삭제</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
