"use client";

import React, { useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import { useNotificationContext } from "../context/NotificationContext";
import {fetchProducts} from "@/app/backend/ProductFetcherComponent";

function ProductAdderComponent() {
    const { setHandleAddProduct, setProducts, setFilteredProducts, setCategories } = useProductContext();
    const { addNotification } = useNotificationContext();

    const addProduct = async (newProduct) => {
        // Replace 'amount' with 'quantity' while keeping the rest of the object intact
        const { amount, ...rest } = newProduct;
        const transformedProduct = {
            ...rest,
            quantity: amount,
            dateAdded: new Date().toISOString().split("T")[0], // Format: YYYY-MM-DD
        };

        try {
            const response = await fetch("http://localhost:3030/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(transformedProduct),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Product successfully added:", result);

            // Add notification
            addNotification(`Product "${transformedProduct.name}" added successfully!`);

            // Fetch updated products
            const products = await fetchProducts(); // Fetch the latest products
            setProducts(products);
            setFilteredProducts(products);

            // Update categories
            const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
            setCategories(uniqueCategories);
        } catch (error) {
            console.error("Error adding product:", error.message);
            addNotification(`Failed to add product: ${error.message}`);
        }
    };

    useEffect(() => {
        setHandleAddProduct(() => addProduct);
    }, [setHandleAddProduct]);

    return <></>;
}

export default ProductAdderComponent;