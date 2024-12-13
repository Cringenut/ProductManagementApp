import React from 'react';
import ProductCard from "./ProductCardComponent";
import '../../../styles/ProuductGrid.css';

const ProductGrid = ({ currentProducts }) => {
    return (
        <div className="product-grid">
            {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
