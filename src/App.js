
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import { CartProvider, useCart } from './components/CartContext'; 
import './styles.css';

const Header = ({ onSearch }) => {
  const { cart } = useCart(); 
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchChange = (e) => {
    onSearch(e.target.value); 
  };

  return (
    <header className="navbar">
      <img src="/logo.png" alt="brand" className="brand" />
      <img
        width="40"
        height="40"
        src="https://img.icons8.com/office/40/marker.png"
        alt="marker"
        id="location"
      />
      <span id="spacing">Deliver to <br /> this address</span>
      <input
        type="text"
        placeholder="🔍Search products by name..."
        className="search-bar"
        onChange={handleSearchChange} // Update search term on change
      />
      <img src="/IndiaFlag.jpg" alt="IndiaFlag" className="flag" />
      <h4 className="language">EN</h4>

      {/* Cart Icon with Total Items */}
      <Link to="/cart" id="fast-cart">
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/stickers/50/fast-cart.png"
          alt="Cart"
        />
        {/* Display total items */}
        <span className="cart-total">{totalItems}</span>
      </Link>

      <h1 className="header">Amazing.com</h1>
    </header>
  );
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <CartProvider>
      <Router>
        <div>
          <Header onSearch={setSearchTerm} /> 
          <Routes>
            <Route path="/" element={<ProductList searchTerm={searchTerm} />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
