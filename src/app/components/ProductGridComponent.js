import React, {useContext} from 'react';
import ProductCard from "./ProductCardComponent";
import '../../styles/ProuductGrid.css';
import {ProductProvider, useProductContext} from "@/app/context/ProductContext";


const ProductGrid = ({ onRemoveProduct, onInfoClick, onEditClick }) => {
    const { products, setProducts } = useProductContext();

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
