import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';
import { useAppSelector } from '../hooks/rootState';
import { RootState } from '../store/store';

const Header: React.FC = () => {
    const userLogin = useAppSelector((state: RootState) => state.users.login);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        logout();
    };

    return (
        <div>
            <header>
                <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
                    <Container>
                        <LinkContainer to="/">
                            <Nav.Link>
                                <Navbar.Brand>Eshop-Store</Navbar.Brand>
                            </Nav.Link>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Routes>
                                <Route element={<SearchBox />} />
                            </Routes>
                            <Nav className="ml-auto">
                                <LinkContainer to="/cart">
                                    <Nav.Link>
                                        <i className="fas fa-shopping-cart"></i> Cart
                                    </Nav.Link>
                                </LinkContainer>
                                {userInfo ? (
                                    <NavDropdown title={userInfo.name} id="username">
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <LinkContainer to="/login">
                                        <Nav.Link>
                                            <i className="fas fa-user"></i> Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                )}
                                {userInfo && userInfo.isAdmin && (
                                    <NavDropdown title="admin" id="adminmenu">
                                        <LinkContainer to="/admin/userlist">
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/productlist">
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/orderlist">
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </div>
    );
};

export default Header;
