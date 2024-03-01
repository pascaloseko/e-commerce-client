import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../Components/Product";
import Message from '../Components/Message'
import Loader from "../Components/Loader";
import Paginate from "../Components/Paginate";
import ProductCarousel from "../Components/ProductCarousel";
import { listProducts } from "../actions/productActions";
import useParams from "../hooks/useParams";
import { useAppDispatch, useAppSelector } from "../hooks/rootState";
import { RootState } from "../store/store";

const HomeScreen: React.FC = () => {
  const { params } = useParams();
  const dispatch = useAppDispatch();
  const keyword  = params.keyword;
  const pageNumber = params.pageNumber || "1"; // Default pageNumber to "1" if not provided

  const productList = useAppSelector((state: RootState) => state.products.list);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [keyword, pageNumber]);


  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products?.map((product: { _id: string, rating: number}) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages ?? 0} page={page ?? 0} keyword={keyword ?? ""} isAdmin={false} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
