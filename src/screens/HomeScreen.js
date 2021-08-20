import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const productList = useSelector((state) => state.productList);

  const { error, loading, products } = productList;

  const searchedProducts =
    products &&
    products.filter((product) => {
      return (
        product.name.toLowerCase().includes(search.toLowerCase()) || !search
      );
    });

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <section className="mt-5">
      <input
        placeholder="Search for fresh vegetables and fruits..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <h1>Fresh Vegetables</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {searchedProducts &&
            searchedProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      )}
    </section>
  );
}
