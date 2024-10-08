import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, selectDisabledProducts,resetDisabledProducts } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const disabledProducts = useSelector(selectDisabledProducts);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
        const cost = parseFloat(item.cost) || 0; // Ensure cost is a number
        const quantity = parseInt(item.quantity, 10) || 0; // Ensure quantity is a number
        const itemTotal = total + cost * quantity;
        return itemTotal;
      }, 0);
  };

  const handleContinueShopping = (e) => {
    if (e) {
        e.preventDefault();
    }
    if (onContinueShopping) {
        onContinueShopping();
    }
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantityChange : 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // Decrease quantity if more than 1
      dispatch(updateQuantity({ name: item.name, quantityChange: -1 }));
    } else {
      // Remove item if quantity is 1
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name })); // This will update the Redux state to re-enable the Add to Cart button
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Ensure cost and quantity are numbers
    const cost = parseFloat(item.cost) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;

    // Calculate the total cost for the specific item
    return cost * quantity;
  };

  const handleCheckoutShopping = (e) => {
  alert('Functionality to be added for future reference');
};

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


