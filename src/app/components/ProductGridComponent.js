import React from 'react';
import ProductCard from "./ProductCardComponent";
import '../../styles/ProuductGrid.css';


const ProductGrid = ({ products, onRemoveProduct, onInfoClick, onEditClick }) => {
    return (
        <div className="product-grid">
            {
                products.map((product, index) => (
                    <ProductCard key={index}
                                 product={product}
                                 onRemoveProduct={onRemoveProduct}
                                 onInfoClick={onInfoClick}
                                 onEditClick={onEditClick}
                    />
                ))
            }
        </div>
    );
};

export default ProductGrid;
