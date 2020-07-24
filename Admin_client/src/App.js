import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./assets/css/base.css"
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Admin}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
 