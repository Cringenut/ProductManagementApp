"use client";

import React, { useCallback } from "react";
import { useProductContext } from "@/app/context/ProductContext";
import { useNotificationContext } from "@/app/context/NotificationContext";

function ProductRemoverComponent() {
    const { dispatch } = useProductContext();
    const { addNotification } = useNotificationContext();

    const removeProduct = useCallback(async (productId) => {
        try {
            const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
            const updatedProducts = storedProducts.filter((product) => product.id !== productId);
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            dispatch({ type: "REMOVE_PRODUCT", payload: productId });

            await fetch(`http://localhost:3030/products/${productId}`, {
                method: "DELETE",
            });

            addNotification(`Product removed successfully!`);
        } catch (error) {
            addNotification(`Failed to sync product removal with API: ${error.message}`);
        }
    }, [dispatch, addNotification]);

    return null;
}

export default ProductRemoverComponent;
