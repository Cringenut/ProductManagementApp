"use client"

import { useState, useEffect } from "react";
import TopMenuComponent from "@/app/components/TopMenuComponent";
import ProductGrid from "@/app/components/ProductGridComponent";

export default function MainPageComponent({ serverProducts }) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

    useEffect(() => {
        setProducts(serverProducts);
        setFilteredProducts(serverProducts);
    }, [serverProducts]);

    const handlePriceFilter = ({ min = 0, max = Infinity }) => {
        setPriceRange({ min, max });
        const filtered = products.filter(product =>
            product.price_per_unit >= min && product.price_per_unit <= max &&
            (selectedCategory ? product.category === selectedCategory : true)
        );
        setFilteredProducts(filtered);
    };

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        const { min, max } = priceRange;
        const filtered = products.filter(product =>
            (!category || product.category === category) &&
            product.price_per_unit >= min && product.price_per_unit <= max
        );
        setFilteredProducts(filtered);
    };

    const handleRemoveProduct = (productId) => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);

        const updatedFilteredProducts = filteredProducts.filter(product => product.id !== productId);
        setFilteredProducts(updatedFilteredProducts);
    };

    const categories = Array.from(new Set(serverProducts.map(product => product.category)));

    return(
        <>
            <TopMenuComponent
                onFilter={handlePriceFilter}
                onCategoryFilter={handleCategoryFilter}
                selectedCategory={selectedCategory}
                categories={categories}
            />
            <ProductGrid products={filteredProducts} onRemoveProduct={handleRemoveProduct} />
        </>
    );
}
