"use client";

import { useEffect } from "react";
import { useProductContext } from "@/app/context/ProductContext";
import { generateFakeProducts } from "@/app/backend/ProductsFaker";

export default function ProductFetcher() {
    const { dispatch } = useProductContext();

     const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:3030/products");
            if (!response.ok) throw new Error(`API error: ${response.status}`);
            const data = await response.json();
            localStorage.setItem("products", JSON.stringify(data));
            return data;
        } catch (error) {
            const storedProducts = localStorage.getItem("products");
            if (storedProducts && JSON.parse(storedProducts).length > 0) {
                return JSON.parse(storedProducts);
            }
            const fakeProducts = generateFakeProducts(20);
            localStorage.setItem("products", JSON.stringify(fakeProducts));
            return fakeProducts;
        }
    };


    useEffect(() => {
        const loadProducts = async () => {
            const products = await fetchProducts();
            dispatch({ type: "SET_PRODUCTS", payload: products });
            dispatch({ type: "SET_FILTERED_PRODUCTS", payload: products });

            const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
            dispatch({ type: "SET_CATEGORIES", payload: uniqueCategories });
        };

        loadProducts();
    }, [dispatch]);

    return null;
}
