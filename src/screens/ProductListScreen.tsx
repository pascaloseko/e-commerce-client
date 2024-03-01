import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import Paginate from '../Components/Paginate';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { useNavigate } from 'react-router-dom';
import useParams from '../hooks/useParams';
import { useAppDispatch, useAppSelector } from '../hooks/rootState';
import { RootState } from '../store/store';

const ProductListScreen: React.FC = () => {
  const history = useNavigate();
  const { params } = useParams();
  const pageNumber = params.pageNumber || 1;

  const dispatch = useAppDispatch();

  const productList = useAppSelector((state: RootState) => state.products.list);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useAppSelector((state: RootState) => state.products.delete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const productCreate = useAppSelector((state: RootState) => state.products.create);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

  const userLogin = useAppSelector((state: RootState) => state.users.login);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history('/login');
    }
    if (successCreate) {
      history(`/admin/product/${createdProduct._id}/edit`);
    } else {
      listProducts('', pageNumber.toString());
    }
  }, [history, userInfo, successDelete, successCreate, createdProduct, pageNumber]);

  const deleteHandler = (id: number) => {
    if (window.confirm('Are You Sure')) {
      deleteProduct(id);
    }
  };

  const createProductHandler = () => {
    createProduct();
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
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
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product: any) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} keyword='' />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
