import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";

import CartScreen from "./screens/CartScreen";

import ProductListScreen from "./screens/ProductListScreen";
import AddProductScreen from "./screens/AddProductScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

import OrderListScreen from "./screens/OrderListScreen";
import MyOrderListScreen from "./screens/MyOrderListScreen";

export default function App() {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/register" component={RegisterScreen} exact />
            <Route path="/login" component={LoginScreen} exact />
            <Route path="/" component={HomeScreen} exact />
            <Route path="/cart" component={CartScreen} />
            <Route path="/admin/productlist" component={ProductListScreen} />
            <Route path="/admin/addproduct" component={AddProductScreen} />
            <Route path="/shipping" component={ShippingScreen} />

            <Route path="/placeorder" component={PlaceOrderScreen} />

            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route path="/myorders" component={MyOrderListScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}
