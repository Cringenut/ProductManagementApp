import React from 'react';
import ProductCard from "./ProductCardComponent";
import '../../styles/ProuductGrid.css';


const ProductGrid = ({ products, onRemoveProduct, onInfoClick }) => {
    return (
        <div className="product-grid">
            {
                products.map((product, index) => (
                    <ProductCard key={index} product={product} onRemoveProduct={onRemoveProduct} onInfoClick={onInfoClick} />
                ))
            }
        </div>
    );
};

export default ProductGrid;
