import React from "react";

import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";

import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "../actions/userActions";

export default function Header() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <Navbar
      bg="primary"
      expand="lg"
      style={{
        position: "sticky",
        top: "0",
        zIndex: "1",
      }}
    >
      <Container>
        <Navbar.Brand>
          <NavLink
            exact
            to="/"
            activeClassName="active"
            style={{ textDecoration: "none", color: "black" }}
          >
            Veg-Shop
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link>
              <NavLink
                exact
                to="/"
                activeClassName="active"
                style={{ textDecoration: "none", color: "black" }}
              >
                Home
              </NavLink>
            </Nav.Link>

            <Nav.Link>
              <NavLink
                exact
                to="/cart"
                activeClassName="active"
                style={{ textDecoration: "none", color: "black" }}
              >
                Cart
              </NavLink>
            </Nav.Link>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                {userInfo.role === "admin" ? (
                  <>
                    <NavDropdown.Item>
                      <NavLink
                        exact
                        to="/admin/orderlist"
                        activeClassName="active"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Orders
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink
                        exact
                        to="/admin/productlist"
                        activeClassName="active"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Products
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <NavLink
                        exact
                        to="/myorders"
                        activeClassName="active"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        My Orders
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(logout());
                        }}
                      >
                        Logout
                      </Button>
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item>
                      <NavLink
                        exact
                        to="/myorders"
                        activeClassName="active"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        My Orders
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(logout());
                        }}
                      >
                        Logout
                      </Button>
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            ) : (
              <>
                <Nav.Link>
                  <NavLink
                    exact
                    to="/login"
                    activeClassName="active"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Login
                  </NavLink>
                </Nav.Link>

                <Nav.Link>
                  <NavLink
                    exact
                    to="/register"
                    activeClassName="active"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Register
                  </NavLink>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  // return (
  //   <>
  //     <nav class="navbar navbar-light">
  //       <div class="container">
  //         <a class="navbar-brand" href="index.html">
  //           conduit
  //         </a>
  //         <ul class="nav navbar-nav pull-xs-right">
  //           <li class="nav-item">
  //             {/* <!-- Add "active" class when you're on that page" --> */}
  //             <a class="nav-link active" href="">
  //               Home
  //             </a>
  //           </li>
  //           <li class="nav-item">
  //             <a class="nav-link" href="">
  //               <i class="ion-compose"></i>&nbsp;New Post
  //             </a>
  //           </li>
  //           <li class="nav-item">
  //             <a class="nav-link" href="">
  //               <i class="ion-gear-a"></i>&nbsp;Settings
  //             </a>
  //           </li>
  //           {/* <li class="nav-item">
  //             <a class="nav-link" href="">
  //               Sign up
  //             </a>
  //           </li> */}
  //         </ul>
  //       </div>
  //     </nav>
  //   </>
  // );
}
