import { Route, Switch } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { AllMeetupsPage, FavoritePage, NewMeetupPage } from './pages'

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path='/'>
            <AllMeetupsPage />
          </Route>
          <Route path='/new'>
            <NewMeetupPage />
          </Route>
          <Route path='/favorites'>
            <FavoritePage />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
