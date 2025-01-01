
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error.message);
        alert('Failed to load products. Please try again later.');
      });

    axios.get('https://fakestoreapi.com/products/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error.message);
        alert('Failed to load categories. Please try again later.');
      });
  }, []);

  const handleFilter = (category) => {
    setFilter(category);
  };

  const handleSort = (order) => {
    setSort(order);
  };

  const filteredProducts = products
    .filter(
      (product) =>
        (!filter || product.category === filter) &&
        (!searchTerm || product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating-desc') return b.rating.rate - a.rating.rate;
    return 0;
  });

  return (
    <div>
      <div className="filters">
        <select onChange={(e) => handleFilter(e.target.value)} className='colorChange'>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select onChange={(e) => handleSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
      </div>

      <div className="product-list">
        {sortedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
