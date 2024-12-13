"use client";

import React, { useEffect } from "react";
import { useProductContext } from "@/app/context/ProductContext";
import { useNotificationContext } from "@/app/context/NotificationContext";

function ProductAdderComponent() {
    const { addNotification } = useNotificationContext();
    const { setProducts } = useProductContext();

    const handleAddProduct = useCallback(async (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
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
    }, [addNotification, setProducts]);

    return null;
}

export default ProductAdderComponent;
