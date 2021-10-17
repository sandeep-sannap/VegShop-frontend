import React, { useEffect, useState } from "react";
import { Col, Row, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
export default function ProductListScreen({ history }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { error, loading, products } = useSelector(
    (state) => state.productList
  );

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.productDelete);

  const { userInfo } = useSelector((state) => state.userLogin);

  const searchedProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(search.toLowerCase()) || !search;
  });

  useEffect(() => {
    if (!userInfo || userInfo.role !== "admin") {
      history.push("/login");
    }

    dispatch(listProducts());
  }, [dispatch, userInfo, history, successDelete]);

  const deleteHandler = (product) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteProduct(product));
    }
  };

  return (
    <section className="mt-5">
      <input
        placeholder="Search for fresh vegetables and fruits..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Link to="/admin/addproduct">
            <Button className="my-3">
              {" "}
              <i className="fas fa-plus"></i>Create Product
            </Button>
          </Link>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {searchedProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>

                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </section>
  );
}
