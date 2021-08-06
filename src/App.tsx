import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Home from "@/views/Home";

export default function App({ callback }) {
  return (
    <Router basename="/iotScreenPc">
      <div ref={callback}>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/home1">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
