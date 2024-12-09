import { useState } from 'react';

const useCart = (initialCart = []) => {
    const [cart, setCart] = useState(initialCart);

    // Fetch cart from backend
    const fetchCart = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/cart', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch cart');
          }
      
          const data = await response.json();
          console.log('Cart:', data);
        } catch (error) {
          console.error('Error fetching cart:', error.message);
        }
      };

    // Clear the cart
    const clearCart = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://127.0.0.1:8000/api/cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setCart([]); // Clear the cart on the frontend
                console.log('Cart cleared successfully!');
            } else {
                console.error('Failed to clear cart:', response.statusText);
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    // Calculate total price
    const calculateTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return { cart, setCart, fetchCart, clearCart, calculateTotal };
};

export default useCart;
