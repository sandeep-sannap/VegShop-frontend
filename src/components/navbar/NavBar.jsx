import React, { useState } from "react";
import "./navbar.css";
import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";

export default function NavBar() {
  const history = useHistory();
  const [toggleMenu, setToggleMenu] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { cartItems } = useSelector((state) => state.cart);

  const user = true;

  const totalItems = cartItems
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const logoutHandler = (e) => {
    e.preventDefault();
    history.push("/");
    dispatch(logout());
  };

  return (
    <div className="nav-container">
      <div className="nav-wrapper">
        <div className="nav-center">
          <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
            <h1 className="logo">VegShop</h1>
          </NavLink>
        </div>
        <div className="nav-right">
          <NavLink to="/cart">
            <div className="menu-item">
              <Badge badgeContent={totalItems} color="primary">
                <ShoppingCartOutlined></ShoppingCartOutlined>
              </Badge>
            </div>
          </NavLink>
          {!userInfo ? (
            <>
              <NavLink
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="menu-item">LOGIN</div>
              </NavLink>
              <NavLink
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="menu-item">REGISTER</div>
              </NavLink>
            </>
          ) : (
            <>
              <div className="drop-down-container">
                <div
                  className="drop-down-title"
                  onClick={() => {
                    setToggleMenu(!toggleMenu);
                  }}
                >
                  {userInfo.name}{" "}
                  <i class="fa fa-chevron-circle-down" aria-hidden="true"></i>
                  {toggleMenu && (
                    <div className="drop-down-item-container">
                      {userInfo.role === "admin" ? (
                        <>
                          <NavLink
                            to="/admin/orderlist"
                            style={{ textDecoration: "none" }}
                          >
                            <div className=" drop-down-item">ORDERS</div>
                          </NavLink>
                          <NavLink
                            to="/admin/productlist"
                            style={{ textDecoration: "none" }}
                          >
                            <div className=" drop-down-item">PRODUCTS</div>
                          </NavLink>
                        </>
                      ) : (
                        <NavLink
                          to="/myorders"
                          style={{ textDecoration: "none" }}
                        >
                          <div className=" drop-down-item">ORDERS</div>
                        </NavLink>
                      )}

                      <div
                        className=" drop-down-item logout"
                        onClick={(e) => {
                          logoutHandler(e);
                        }}
                      >
                        LOGOUT
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
