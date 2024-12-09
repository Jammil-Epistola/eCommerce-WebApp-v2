import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Modal, Navbar, Badge } from 'react-bootstrap';
import '../AdminAndUser.css';

const FrontStore = ({ cart, setCart, onLogout }) => {
    const [products, setProducts] = useState([]);
    const [showCartModal, setShowCartModal] = useState(false);
    const navigate = useNavigate();

    // Fetch products from the Laravel API
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    // Redirect to ProductPage.js
    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    // Remove product from cart
    const removeFromCart = (product) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    };

    // Calculate total price of items in the cart
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="front-store">
            {/* Navbar */}
            <Navbar expand="lg" variant="dark" className="navbarBackground">
                <Container>
                    <Navbar.Brand href="#">Lazapii</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Button variant="light" onClick={() => setShowCartModal(true)} className="me-2">
                            Cart <Badge bg="secondary">{cart.length}</Badge>
                        </Button>
                        <Button variant="danger" onClick={onLogout}>
                            Logout
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Product List */}
            <Container>
                <Row>
                    {products.map((product) => (
                        <Col md={4} key={product.id} className="my-2">
                            <Card
                                className="cardBackground"
                                onClick={() => handleProductClick(product.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>₱{product.price}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Cart Modal */}
            <Modal show={showCartModal} onHide={() => setShowCartModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul className="list-group">
                            {cart.map((item) => (
                                <li
                                    key={item.id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <strong>{item.name}</strong> - ₱{item.price} x {item.quantity}
                                    </div>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => removeFromCart(item)}
                                    >
                                        Remove
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <h5>Total: ₱{cartTotal}</h5>
                    <Button variant="secondary" onClick={() => setShowCartModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={cart.length === 0}>
                        Proceed to Checkout
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FrontStore;
