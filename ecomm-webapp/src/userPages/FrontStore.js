import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Modal, Navbar, Badge } from 'react-bootstrap';
import './FrontStore.css';

const FrontStore = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [cart, setCart] = useState([]);
    const [showCartModal, setShowCartModal] = useState(false);

    // Fetch products from the Laravel API
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Add product to cart
    const addToCart = (product) => {
        setCart(prevCart => {
            const itemExists = prevCart.find(item => item.id === product.id);
            if (itemExists) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Remove product from cart
    const removeFromCart = (product) => {
        setCart(prevCart => prevCart.filter(item => item.id !== product.id));
    };

    // Update quantity from the cart
    const updateQuantity = (product, quantity) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: Math.max(quantity, 1) }
                    : item
            )
        );
    };

    // Handle cart modal visibility
    const handleShowCart = () => setShowCartModal(true);
    const handleCloseCart = () => setShowCartModal(false);

    // Logout function
    const handleLogout = () => {
        // Clear any authentication tokens or user data
        localStorage.removeItem('authToken');
        // Redirect to login or home page
        window.location.href = '/login';
    };

    // Filtered products based on search and category
    const filteredProducts = products.filter(product => {
        return (
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (category === 'All' || product.category === category)
        );
    });

    // Calculate total price of items in the cart
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="front-store">
            {/* Navbar */}
            <Navbar expand="lg" variant="dark" className="navbarBackground">
                <Container>
                    <Navbar.Brand href="#">My Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Button variant="light" onClick={handleShowCart} className="me-2">
                            Cart <Badge bg="secondary">{cart.length}</Badge>
                        </Button>
                        <Button variant="danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Search and Filter Section */}
            <Container>
                <Row className="my-3">
                    <Col md={6}>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                            <Button variant="primary">Search</Button>
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="All">All Categories</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Appliances">Appliances</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Frozen Goods">Frozen Goods</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Vegetable">Vegetable</option>
                        </Form.Select>
                    </Col>
                </Row>

                {/* Product List */}
                <Row>
                    {filteredProducts.length === 0 ? (
                        <Col md={12}>
                            <Card className="cardBackground">
                                <Card.Body>No products found</Card.Body>
                            </Card>
                        </Col>
                    ) : (
                        filteredProducts.map(product => (
                            <Col md={4} key={product.id} className="my-2">
                                <Card className="cardBackground">
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>₱{product.price}</Card.Text>
                                        <Button variant="success" onClick={() => addToCart(product)}>
                                            Add to Cart
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>

             {/* Cart Modal */}
             <Modal show={showCartModal} onHide={handleCloseCart}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul className="list-group">
                            {cart.map(item => (
                                <li key={item.id} className="list-group-item">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>{item.name}</strong> = ₱
                                            {item.price * item.quantity}
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => updateQuantity(item, item.quantity - 1)}
                                            >
                                                -
                                            </Button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => updateQuantity(item, item.quantity + 1)}
                                            >
                                                +
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="ms-3"
                                                onClick={() => removeFromCart(item)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <h5>Total: ₱{cartTotal.toFixed(2)}</h5>
                    <Button variant="secondary" onClick={handleCloseCart}>
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
