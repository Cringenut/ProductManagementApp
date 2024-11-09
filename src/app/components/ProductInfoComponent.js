import React, { useEffect } from 'react';
import '../../styles/ProductInfo.css';

const ProductInfoComponent = ({ product, onClose }) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.classList.contains('product-info-overlay')) {
                onClose();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [onClose]);

    if (!product) return null;

    return (
        <div className="product-info-overlay">
            <div className="product-info-content">
                <h2>{product.name}</h2>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Amount:</strong> {product.amount}</p>
                <p><strong>Price per Unit:</strong> ${product.price_per_unit}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Supplier:</strong> {product.supplier}</p>
            </div>
        </div>
    );
};

export default ProductInfoComponent;
