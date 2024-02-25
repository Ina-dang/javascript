import "./App.css";
import { AddTodo, TodoList } from "./components";

function App() {
  return (
    <div className="app">
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
