import { Fragment } from "react";
import { Auth, Counter, Header } from "./components";

function App() {
  return (
    <Fragment>
      <Header />
      <Auth />
      <Counter />
    </Fragment>
  );
}

export default App;
