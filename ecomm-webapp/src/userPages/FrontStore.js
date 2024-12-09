import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Modal,
    Navbar,
    Badge,
    InputGroup,
    Form,
} from 'react-bootstrap';
import '../AdminAndUser.css';

const FrontStore = ({ cart, setCart, onLogout }) => {
    const [products, setProducts] = useState([]);
    const [showCartModal, setShowCartModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');
    const navigate = useNavigate();

    // Fetch products from the Laravel API
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    // Filter products based on search and category
    const filteredProducts = products.filter((product) => {
        const matchesCategory = category === 'All' || product.category === category;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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

    const handleProceedToCheckout = () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Add some items before proceeding to checkout.');
            return;
        }
        navigate('/checkout');
    };

    const returnFrontStore = () => navigate('/frontstore');

    return (
        <div className="front-store">
            {/* Navbar */}
            <Navbar expand="lg" variant="dark" className="navbarBackground">
                <Container>
                    <Navbar.Brand onClick={returnFrontStore}>Lazapii</Navbar.Brand>
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

            {/* Search and Filter Section */}
            <Container>
                <Row className="my-3">
                    <Col md={5}>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button variant="primary" className="buttonBackground">Search</Button>
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <Form.Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Appliances">Appliances</option>
                            <option value="Audio">Audio</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Hobbies & Stationaries">Hobbies & Stationaries</option>
                            <option value="Home Appliances">Home Appliances</option>
                            <option value="Laptops & Computers">Laptops & Computers</option>
                            <option value="Men's Apparel">Men's Apparel</option>
                            <option value="Mobile & Gadgets">Mobile & Gadgets</option>
                            <option value="Pet Care">Pet Care</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Women's Apparel">Women's Apparel</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Container>

            {/* Product List */}
            <Container>
                <Row>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Col md={4} key={product.id} className="my-2">
                                <Card
                                    className="cardBackground"
                                    onClick={() => handleProductClick(product.id)} // Redirect to ProductPage
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>₱{product.price}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p className="text-center mt-3">No products found.</p>
                    )}
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
                    <Button variant="primary" disabled={cart.length === 0} onClick={handleProceedToCheckout}>
                        Proceed to Checkout
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FrontStore;
