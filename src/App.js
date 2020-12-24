import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CharacterList from "./components/CharacterList"
import CharacterDetail from "./components/CharacterDetail"

function App() {
  return (
    <Router >
      <div>
        <Switch>
          <Route exact path="/">
            <CharacterList />
          </Route>
          <Route path="/:id" render={(props) => <CharacterDetail {...props} />} />
        </Switch>
      </div >
    </Router >
  );
}

export default App;
