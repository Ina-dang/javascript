import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Auth, Counter, Header, UserProfile } from "./components";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Fragment>
      <Header />
      {!isAuth && <Auth />}
      {isAuth && <UserProfile />}
      <Counter />
    </Fragment>
  );
}

export default App;
