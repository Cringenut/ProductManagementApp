"use client";

import React, { useCallback } from "react";
import { useProductContext } from "@/app/context/ProductContext";
import { useNotificationContext } from "@/app/context/NotificationContext";

function ProductAdderComponent() {
    const { dispatch } = useProductContext();
    const { addNotification } = useNotificationContext();

    const handleAddProduct = useCallback(async (newProduct) => {
        dispatch({ type: "ADD_PRODUCT", payload: newProduct });
        addNotification("Product added successfully!");

        try {
            const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
            const updatedProducts = [...storedProducts, newProduct];
            localStorage.setItem("products", JSON.stringify(updatedProducts));

            await fetch("http://localhost:3030/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });

            addNotification(`Product "${newProduct.name}" synced successfully with the API!`);
        } catch (error) {
            addNotification(`Failed to sync product with API: ${error.message}`);
        }
    }, [dispatch, addNotification]);

    return null;
}

export default ProductAdderComponent;
