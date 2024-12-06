"use client";

import { useEffect } from "react";
import { useProductContext } from "@/app/context/ProductContext";
import { generateFakeProducts } from "@/app/backend/ProductsFaker";

export const fetchProducts = async () => {
    try {
        // Attempt to fetch from the API
        const response = await fetch("http://localhost:3030/products");
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        // Save to localStorage and return data
        localStorage.setItem("products", JSON.stringify(data));
        return data;
    } catch (error) {
        console.warn("API unavailable. Using localStorage or generating fake products. Error:", error.message);

        // Check localStorage
        const storedProducts = localStorage.getItem("products");
        if (storedProducts && JSON.parse(storedProducts).length > 0) {
            console.log("Products fetched from localStorage:", JSON.parse(storedProducts));
            return JSON.parse(storedProducts);
        }

        // Generate fake products as a fallback
        const fakeProducts = generateFakeProducts(20); // Generate 20 products
        localStorage.setItem("products", JSON.stringify(fakeProducts));
        console.log("Generating and saving fake products:", fakeProducts);
        return fakeProducts;
    }
};


export default function ProductFetcher() {
    const { setProducts, setFilteredProducts, setCategories } = useProductContext();

    useEffect(() => {
        const loadProducts = async () => {
            const products = await fetchProducts();
            console.log("Products loaded: ", products)
            setProducts(products);
            setFilteredProducts(products);

            const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
            setCategories(uniqueCategories);
        };

        loadProducts();
    }, [setProducts, setFilteredProducts, setCategories]);

    return null;
}
