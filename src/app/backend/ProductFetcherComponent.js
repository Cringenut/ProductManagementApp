"use client"

import { useState, useEffect } from 'react';
import {useProductContext} from "@/app/context/ProductContext";

export default function ProductFetcher() {
    const {
        setProducts,
        setCategories,
        setFilteredProducts,
        products,
        categories,
        filteredProducts,
    } = useProductContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:3030/products'); // Adjust API route if necessary
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);

                // Extract unique categories
                const uniqueCategories = Array.from(new Set(data.map((p) => p.category)));
                setCategories(uniqueCategories);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [setProducts, setCategories, setFilteredProducts]);

    return (
        <div>
            {loading && <p>Loading products...</p>}
            {error && <p>Error fetching products: {error}</p>}
        </div>
    );
}
