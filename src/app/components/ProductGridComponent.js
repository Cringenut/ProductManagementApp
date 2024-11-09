import React from 'react';
import ProductCard from "./ProductCardComponent";
import '../../styles/ProuductGrid.css';


const ProductGrid = ({ products, onRemoveProduct }) => {
    return (
        <div className="product-grid">
            {
                products.map((product, index) => (
                    <ProductCard key={index} product={product} onRemoveProduct={onRemoveProduct} />
                ))
            }
        </div>
    );
};

export default ProductGrid;
