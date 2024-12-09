import React, { useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../AdminAndUser.css";

const Checkout = ({ cart, onLogout }) => {
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [creditCardDetails, setCreditCardDetails] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const navigate = useNavigate();

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (
      !shippingDetails.name ||
      !shippingDetails.address ||
      !shippingDetails.phone ||
      !paymentMethod ||
      (["Credit Card"].includes(paymentMethod) && !creditCardDetails)
    ) {
      alert("Please fill out all fields before confirming your order.");
      return;
    }
    setOrderConfirmed(true);
  };

  const returnFrontStore = () => navigate("/frontstore");

  return (
    <div>
      {/* Navbar at the Top */}
      <Navbar expand="lg" variant="dark" className="navbarBackground">
        <Container>
          <Navbar.Brand onClick={returnFrontStore}>Lazapii</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            {/* Front Store Text Link */}
            <button variant="success" onClick={returnFrontStore}>
              Front Store
            </button>
            <button variant="danger" onClick={onLogout}>
              Logout
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <div className="checkout-container">
        {!orderConfirmed ? (
          <form onSubmit={handleOrderSubmit} className="checkout-form">
            {/* Cart Summary */}
            <div className="card">
              <h2 className="card-header">Cart Summary</h2>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul className="cart-summary">
                  {cart.map((item) => (
                    <li key={item.id}>
                      {item.name} - ₱{item.price} x {item.quantity}
                    </li>
                  ))}
                </ul>
              )}
              <h3>Total: ₱{cartTotal}</h3>
            </div>

            {/* Shipping Details */}
            <div className="card">
              <h2 className="card-header">Shipping Details</h2>
              <label>
                Name:
                <input
                  type="text"
                  value={shippingDetails.name}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </label>
              <br />
              <label>
                Address:
                <input
                  type="text"
                  value={shippingDetails.address}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      address: e.target.value,
                    })
                  }
                  required
                />
              </label>
              <br />
              <label>
                Phone:
                <input
                  type="text"
                  value={shippingDetails.phone}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      phone: e.target.value,
                    })
                  }
                  required
                />
              </label>
            </div>

            {/* Payment Method */}
            <div className="card">
              <h2 className="card-header">Payment Method</h2>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Credit Card"
                  checked={paymentMethod === "Credit Card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit Card
              </label>

              {/* Credit Card Details Input */}
              {["Credit Card"].includes(paymentMethod) && (
                <div className="credit-card-input">
                  <label>
                    Enter Card Details:
                    <input
                      type="text"
                      value={creditCardDetails}
                      onChange={(e) => setCreditCardDetails(e.target.value)}
                      placeholder="Card Number"
                      required
                    />
                  </label>
                </div>
              )}
            </div>

            <button type="submit" className="confirm-btn">
              Confirm Order
            </button>
          </form>
        ) : (
          <div className="card">
            <div className="confirmation-page">
              <h1>Thank You!</h1>
              <p>Your order has been placed successfully.</p>
              <hr/>
              <h2>Order Summary:</h2>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} - ₱{item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
              <h3>Total: ₱{cartTotal}</h3>
              <hr/>
              <p>
                Shipping to: {shippingDetails.name}, {shippingDetails.address}{" "}
                {shippingDetails.phone}
              </p>
              <p>Payment Method: {paymentMethod}</p>
              {["Credit Card"].includes(paymentMethod) && (
                <p>Card Details: {creditCardDetails}</p>
              )}
              <button onClick={returnFrontStore} className="btn btn-success">
                Back to Front Store
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
