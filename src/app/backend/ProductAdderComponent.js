"use client";

import React, { useEffect } from "react";
import { useProductContext } from "@/app/context/ProductContext";
import { useNotificationContext } from "@/app/context/NotificationContext";

function ProductAdderComponent() {
    const { setHandleAddProduct, setProducts } = useProductContext();
    const { addNotification } = useNotificationContext();

    const addProduct = async (newProduct) => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const updatedProducts = [...storedProducts, newProduct];
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        setProducts(updatedProducts);

        try {
            await fetch("http://localhost:3030/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });
            addNotification(`Product "${newProduct.name}" added successfully!`);
        } catch (error) {
            addNotification(`Failed to sync product with API: ${error.message}`);
        }
    };

    useEffect(() => {
        setHandleAddProduct(() => addProduct);
    }, [setHandleAddProduct]);

    return null;
}

export default ProductAdderComponent;
