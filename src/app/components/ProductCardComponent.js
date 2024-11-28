import React from 'react';
import '../../styles/ProductCard.css';
import {useProductContext} from "@/app/context/ProductContext";

const ProductCard = ({ product }) => {
    const { handleRemoveProduct, handleInfoClick, handleEditClick } = useProductContext();

    return (
        <div className="product-card">
            <button className="remove-button" onClick={() => handleRemoveProduct(product.id)}>
                x
            </button>
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">Category: {product.category}</p>
                <p className="product-amount">Amount: {product.amount}</p>
                <p className="product-price">Price per unit: ${product.price_per_unit}</p>
            </div>
            <button className="info-button" onClick={() => handleInfoClick(product)}>
                More Info
            </button>
            <button className="info-button" onClick={() => handleEditClick(product)}>
                Edit
            </button>
        </div>
    );
};

export default ProductCard;
