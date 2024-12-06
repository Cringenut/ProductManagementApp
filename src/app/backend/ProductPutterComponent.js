"use client";

import React, { useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import { fetchProducts } from "@/app/backend/ProductFetcherComponent";
import { useNotificationContext } from "../context/NotificationContext";

function ProductPutterComponent() {
    const { setHandleEditProduct, setProducts, setFilteredProducts, setCategories } = useProductContext();
    const { addNotification } = useNotificationContext();

    const updateProduct = async (updatedProduct) => {
        try {
            const response = await fetch(`http://localhost:3030/products/${updatedProduct.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Product successfully updated:", result);

            // Add notification
            addNotification(`Product "${updatedProduct.name}" updated successfully!`);

            // Fetch updated products
            const products = await fetchProducts(); // Fetch the latest products
            setProducts(products);
            setFilteredProducts(products);

            // Update categories
            const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
            setCategories(uniqueCategories);
        } catch (error) {
            console.error("Error updating product:", error.message);
            addNotification(`Failed to update product: ${error.message}`);
        }
    };

    useEffect(() => {
        setHandleEditProduct(() => updateProduct);
    }, [setHandleEditProduct]);

    return <></>;
}

export default ProductPutterComponent;
