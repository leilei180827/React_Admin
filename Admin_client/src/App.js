import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./assets/css/base.css";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" component={Admin} exact></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
