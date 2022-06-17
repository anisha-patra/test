// import logo from './logo.svg';
import './App.css';
import Login from "./login";
import Home from './home';

// import { Redirect, Route, Switch } from "react-router-dom";
import routes from "./route";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";


function App() {
  return (
    <div className="App">

      {/* <Login /> */}
      {/* <Home /> */}



      <Router>
        <Switch>
          {routes.map((route, index) => {
            return route.component ? (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => <route.component {...props} />}
              />
            ) : null;
          })}
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
