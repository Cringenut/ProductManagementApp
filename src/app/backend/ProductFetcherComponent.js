"use client";

import { useState, useEffect } from "react";
import { useProductContext } from "@/app/context/ProductContext";

export const fetchProducts = async () => {
    const response = await fetch("http://localhost:3030/products");
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
};

export default function ProductFetcher() {
    const {
        setProducts,
        setCategories,
        setFilteredProducts,
    } = useProductContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchProducts();
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

        loadProducts();
    }, [setProducts, setCategories, setFilteredProducts]);

    return (
        <div>
            {loading && <p>Loading products...</p>}
            {error && <p>Error fetching products: {error}</p>}
        </div>
    );
}
