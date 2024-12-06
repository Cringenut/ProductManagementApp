import React, {useContext, useLayoutEffect, useRef} from 'react';
import ProductCard from "./ProductCardComponent";
import '../../../styles/ProuductGrid.css';
import {ProductProvider, useProductContext} from "@/app/context/ProductContext";


const ProductGrid = ({ currentProducts }) => {
    const gridRef = useRef(null);

    return (
        <div className="product-grid" ref={gridRef}>
            {currentProducts.slice().reverse().map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
