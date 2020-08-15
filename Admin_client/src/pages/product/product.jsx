import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomeProduct from "./homeProduct";
import DetailProduct from "./detailProduct";
import AddOrEditProduct from "./addOrEditProduct";
import "./product.less";

export default function Product() {
  return (
    <div id="product" style={{ minHeight: "100%" }}>
      <Switch>
        <Route path="/product" component={HomeProduct} exact></Route>
        <Route path="/product/detail" component={DetailProduct}></Route>
        <Route path="/product/update" component={AddOrEditProduct}></Route>
        <Redirect to="/product" />
      </Switch>
    </div>
  );
}
