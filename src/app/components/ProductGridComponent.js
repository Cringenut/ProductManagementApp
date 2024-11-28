import React, {useContext, useLayoutEffect, useRef} from 'react';
import ProductCard from "./ProductCardComponent";
import '../../styles/ProuductGrid.css';
import {ProductProvider, useProductContext} from "@/app/context/ProductContext";


const ProductGrid = () => {
    const { filteredProducts } = useProductContext();
    const gridRef = useRef(null);

    useLayoutEffect(() => {
        console.log("CHANGED")

        if (gridRef.current) {
            console.log("REF")
            gridRef.current.scrollTo({ top: 0 });
        }
    }, [filteredProducts]); // Trigger whenever filteredProducts change

    return (
        <div className="product-grid" ref={gridRef}>
            {filteredProducts.slice().reverse().map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
