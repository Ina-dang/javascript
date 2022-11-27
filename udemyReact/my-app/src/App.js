import { Route, Switch } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { AllMeetupsPage, FavoritePage, NewMeetupPage } from './pages'

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route exact path='/'>
            <AllMeetupsPage />
          </Route>
          <Route exact path='/new'>
            <NewMeetupPage />
          </Route>
          <Route exact path='/favorites'>
            <FavoritePage />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
