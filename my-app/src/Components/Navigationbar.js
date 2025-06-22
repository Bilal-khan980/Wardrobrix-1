import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthContext } from '../AuthContext';

function Navigationbar() {
    const { loggedIn, email, handleLogout, role, id } = useContext(AuthContext);

    console.log("Logged in email:", email); // Log the email

    if (role !== "Admin") {
        console.log(id)

        return (
            <Navbar bg="dark" variant="dark" expand="lg" style={{ height: 90, paddingLeft: "20px", zIndex: "1000" }}>
                <Navbar.Brand as={Link} to="/">
                    <img src="Images/navbar_logo.png" height={50} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">HOME</Nav.Link>
                        <Nav.Link as={Link} to="/newarrivals">NEW ARRIVALS</Nav.Link>
                        <Nav.Link as={Link} to="/mens">MEN</Nav.Link>
                        <Nav.Link as={Link} to="/womens">WOMEN</Nav.Link>
                        <Nav.Link as={Link} to="/about">ABOUT</Nav.Link>
                        <Nav.Link as={Link} to="/contact">CONTACT</Nav.Link>
                        <Nav.Link as={Link} to="/cart">CART</Nav.Link>
                        <Nav.Link as={Link} to="/myorders">ORDERS</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        {loggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/userdashboard">ACCOUNT</Nav.Link>
                                <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/loginpage">LOGIN/REGISTER</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
    else {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" style={{ height: 90, paddingLeft: "20px", zIndex: "1000" }}>
                <Navbar.Brand as={Link} to="/">
                    <img src="Images/navbar_logo.png" height={50} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/admin/products">MANAGE PRODUCTS</Nav.Link>
                        <Nav.Link as={Link} to="/admin/orders">MANAGE ORDERS</Nav.Link>

                    </Nav>
                    <Nav className="ml-auto">
                        {loggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/user">ACCOUNT</Nav.Link>
                                <Nav.Link onClick={handleLogout}>LOGOUT</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/loginpage">LOGIN</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

}

export default Navigationbar;
