
import React from 'react';
import { useCart } from './CartContext'; 

const Cart = () => {
  const { cart, updateQuantity } = useCart(); 

  // Calculating total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = (id, amount) => {
    updateQuantity(id, cart.find((item) => item.id === id).quantity + amount);
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>
                  Quantity:
                  <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  {item.quantity}
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </p>
              </div>
            </div>
          ))}
          <h3 className="cart-total-price">Total Price: ${totalPrice.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
