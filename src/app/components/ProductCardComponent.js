import React from 'react';
import '../../styles/ProductCard.css';

const ProductCard = ({ product, onRemoveProduct, onInfoClick, onEditClick }) => {
    return (
        <div className="product-card">
            <button className="remove-button" onClick={() => onRemoveProduct(product.id)}>
                x
            </button>
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">Category: {product.category}</p>
                <p className="product-amount">Amount: {product.amount}</p>
                <p className="product-price">Price per unit: ${product.price_per_unit}</p>
            </div>
            <button className="info-button" onClick={() => onInfoClick(product)}>
                More Info
            </button>
            <button className="info-button" onClick={() => onEditClick(product)}>
                Edit
            </button>
        </div>
    );
};

export default ProductCard;
