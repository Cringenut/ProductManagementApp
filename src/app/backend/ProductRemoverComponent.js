"use client";

import React, { useEffect } from "react";
import { useProductContext } from "@/app/context/ProductContext";
import { useNotificationContext } from "@/app/context/NotificationContext";

function ProductRemoverComponent() {
    const { setHandleRemoveProduct, setProducts } = useProductContext();
    const { addNotification } = useNotificationContext();

    const removeProduct = async (productId) => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const updatedProducts = storedProducts.filter((product) => product.id !== productId);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        setProducts(updatedProducts);

        try {
            await fetch(`http://localhost:3030/products/${productId}`, {
                method: "DELETE",
            });
            addNotification(`Product removed successfully!`);
        } catch (error) {
            addNotification(`Failed to sync product removal with API: ${error.message}`);
        }
    };

    useEffect(() => {
        setHandleRemoveProduct(() => removeProduct);
    }, [setHandleRemoveProduct]);

    return null;
}

export default ProductRemoverComponent;
