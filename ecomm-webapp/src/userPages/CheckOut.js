import React, { useState } from "react";
import "./Checkout.css";

const Checkout = () => {
  // State for shipping details
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // State for payment method and details
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");

  // State for confirmation message
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Handle order submission
  const handleOrderSubmit = (e) => {
    e.preventDefault();

    const { name, address, phone } = shippingDetails;

    // Validate required fields
    if (!name || !address || !phone || !paymentMethod) {
      alert("Please fill out all fields before confirming your order.");
      return;
    }

    if (["Credit Card"].includes(paymentMethod) && !paymentDetails) {
      alert("Please provide your payment details.");
      return;
    }

    // Simulate order confirmation
    setOrderConfirmed(true);
  };

  // Render payment input if needed
  const renderPaymentInput = () => {
    if (paymentMethod === "Cash on Delivery") {
      return null; // No extra input required for COD
    }

    const placeholderMap = {
      "Credit Card": "Enter Credit Card number",
    };

    return (
      <input
        type="text"
        placeholder={placeholderMap[paymentMethod]}
        value={paymentDetails}
        onChange={(e) => setPaymentDetails(e.target.value)}
      />
    );
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {!orderConfirmed ? (
        <form onSubmit={handleOrderSubmit} className="checkout-form">
          {/* Shipping Details */}
          <h2>Shipping Details</h2>
          <label>
            Name:
            <input
              type="text"
              value={shippingDetails.name}
              onChange={(e) =>
                setShippingDetails({ ...shippingDetails, name: e.target.value })
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
                setShippingDetails({ ...shippingDetails, phone: e.target.value })
              }
              required
            />
          </label>
          <br />

          {/* Payment Method */}
          <h2>Payment Method</h2>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Payment Method
            </option>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Credit Card">Credit Card</option>
          </select>
          <br />

          {renderPaymentInput()}

          {/* Confirm Order Button */}
          <button type="submit" className="confirm-btn">
            Confirm Order
          </button>
        </form>
      ) : (
        <div className="confirmation-page">
          <h1>Thank You!</h1>
          <p>Your order has been placed successfully.</p>
          <button
            className="back-btn"
            onClick={() => {
              setShippingDetails({ name: "", address: "", phone: "" });
              setPaymentMethod("");
              setPaymentDetails("");
              setOrderConfirmed(false);
            }}
          >
            Back to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
