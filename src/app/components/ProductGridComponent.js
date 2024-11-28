import React, {useContext} from 'react';
import ProductCard from "./ProductCardComponent";
import '../../styles/ProuductGrid.css';
import {ProductProvider, useProductContext} from "@/app/context/ProductContext";


const ProductGrid = () => {
    const { filteredProducts } = useProductContext();

    return (
        <div className="product-grid">
            {filteredProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
