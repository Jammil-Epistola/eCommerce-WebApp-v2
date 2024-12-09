import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Navbar, Nav, Modal } from 'react-bootstrap';
import '../AdminAndUser.css';

const Dashboard = ({ onLogout }) => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);  // Delete confirmation
    const [editingProduct, setEditingProduct] = useState(null);  //  Edit
    const [productToDelete, setProductToDelete] = useState(null);  // Delete

    const [newProduct, setNewProduct] = useState({
        barcode: '',
        name: '',
        description: '',
        category: '',  
        avail_quantity: '',
        price: ''
    });
    // Fetch products from Laravel API
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products')  
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Handle: Add/Edit modal
    const handleAddProduct = () => {
        setNewProduct({
            barcode: '',
            name: '',
            description: '',
            category: '', 
            avail_quantity: '',
            price: ''
        });
        setEditingProduct(null);
        setShowModal(true);
    };

    const handleEditProduct = (product) => {
        setNewProduct(product);  // Pre-fill the form with the product data
        setEditingProduct(product); 
        setShowModal(true);  
    };

    const handleSaveProduct = () => {
        if (!newProduct.barcode || !newProduct.name || !newProduct.description || !newProduct.price || !newProduct.avail_quantity) {
            alert('Please fill in all fields');
            return;
        }
    
        const url = editingProduct 
            ? `http://127.0.0.1:8000/api/products/${editingProduct.id}`
            : 'http://127.0.0.1:8000/api/products';
    
        const method = editingProduct ? 'PUT' : 'POST';
    
        // Save or update the product via the API
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => response.json())
        .then(data => {
            if (editingProduct) {
                setProducts(products.map(p => (p.id === editingProduct.id ? data : p)));
            } else {
                setProducts([...products, data]);
            }
    
            setShowModal(false);
            setNewProduct({
                barcode: '',
                name: '',
                description: '',
                category: '',
                avail_quantity: '',
                price: ''
            });
        })
        .catch(error => console.error('Error saving product:', error));
    };

    // Handle showing delete confirmation modal
    const handleDeleteProduct = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    // Confirm deletion
    const confirmDeleteProduct = () => {
        if (!productToDelete) return;

        fetch(`http://127.0.0.1:8000/api/products/${productToDelete.id}`, {
            method: 'DELETE'
        })
        .then(() => {
            setProducts(products.filter(p => p.id !== productToDelete.id));
            setShowDeleteModal(false);
        })
        .catch(error => console.error('Error deleting product:', error));
    };

    const handleModalClose = () => setShowModal(false);
    const handleDeleteModalClose = () => setShowDeleteModal(false);

    // Filter and search logic
    const filteredProducts = products.filter(product => {
        return (
            (product.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (category === 'All' || product.category === category)
        );
    });

    return (
        <div className="bodyBackground">
            {/* Navbar */}
            <Navbar expand="lg" variant="dark" className="navbarBackground">
                <Container>
                    <Navbar.Brand href="#">Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link href="#">Dashboard</Nav.Link>
                            <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                        </Nav>
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
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                            <Button variant="primary" className="buttonBackground">Search</Button>
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
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
                    <Col md={3}>
                        <Button variant="success" onClick={handleAddProduct} className="buttonBackground">
                            + Add Product
                        </Button>
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
                                        <Card.Subtitle className="mb-2">
                                            Barcode: {product.barcode}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            Description: {product.description}
                                        </Card.Text>
                                        <Card.Text>
                                            Category: {product.category}
                                        </Card.Text>
                                        <Card.Text>
                                            Available Quantity: {product.avail_quantity}
                                        </Card.Text>
                                        <Card.Text>
                                            Price: ₱{product.price}
                                        </Card.Text>
                                        <Button onClick={() => handleEditProduct(product)} className="blueButton me-2">
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDeleteProduct(product)} className="redButton">
                                            Delete
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>

                {/* Add/Edit Product Modal */}
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editingProduct ? 'Edit Product' : 'Add Product'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group controlId="productBarcode">
                            <Form.Label>Barcode</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter product barcode"
                                value={newProduct.barcode}
                                onChange={e => setNewProduct({ ...newProduct, barcode: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="productName" className="mt-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter product name"
                                value={newProduct.name}
                                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="productDescription" className="mt-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3}
                                placeholder="Enter product description"
                                value={newProduct.description}
                                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="productCategory" className="mt-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                value={newProduct.category}
                                onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
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
                        </Form.Group>
                        <Form.Group controlId="productAvailQuantity" className="mt-3">
                            <Form.Label>Available Quantity</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Enter available quantity"
                                value={newProduct.avail_quantity}
                                onChange={e => setNewProduct({ ...newProduct, avail_quantity: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="productPrice" className="mt-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Enter product price"
                                value={newProduct.price}
                                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSaveProduct}>
                            {editingProduct ? 'Save Changes' : 'Add Product'}
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete "{productToDelete?.name}"?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleDeleteModalClose}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={confirmDeleteProduct}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default Dashboard;