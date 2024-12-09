import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Modal, Navbar, Badge } from 'react-bootstrap';
import '../AdminAndUser.css';

const ProductPage = ({ cart, setCart, onLogout }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [showCartModal, setShowCartModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/products/${id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error('Error fetching product:', error));
    }, [id]);

    // Add product to cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const itemInCart = prevCart.find((item) => item.id === product.id);
            if (itemInCart) {
                return prevCart.map((item) =>
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
        <div className="product-page">
            <Navbar expand="lg" variant="dark" className="navbarBackground">
                <Container>
                    <Navbar.Brand onClick={returnFrontStore}>Lazapii</Navbar.Brand>
                    <Button variant="light" onClick={() => setShowCartModal(true)} className="me-2">
                        Cart <Badge bg="secondary">{cart.length}</Badge>
                    </Button>
                    <Button variant="danger" onClick={onLogout}>
                        Logout
                    </Button>
                </Container>
            </Navbar>

            <Container className="mt-5">
                {product ? (
                    <Card>
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>₱{product.price}</Card.Text>
                            <hr/>
                            <Card.Text>Description: {product.description}</Card.Text>
                            <Card.Text>Category: {product.category}</Card.Text>
                            <Card.Text>Available Quantity: {product.avail_quantity}</Card.Text>
                            <Button variant="success" onClick={() => addToCart(product)}>
                                Add to Cart
                            </Button>
                        </Card.Body>
                    </Card>
                ) : (
                    <p>Loading product...</p>
                )}
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
                    <Button variant="primary" onClick={handleProceedToCheckout} >Proceed to Checkout</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductPage;