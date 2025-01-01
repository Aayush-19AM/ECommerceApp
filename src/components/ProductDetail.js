
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)}>Back</button>
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p><b>Price:</b> ${product.price}</p>
      <p><b>Rating:</b> ⭐{product.rating.rate} ({product.rating.count} reviews)</p>
      <p><b>Category:</b> {product.category}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;

