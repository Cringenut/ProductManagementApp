"use client";

import React, {useCallback, useEffect} from "react";
import { useProductContext } from "@/app/context/ProductContext";
import { useNotificationContext } from "@/app/context/NotificationContext";

function ProductRemoverComponent() {
    const { setHandleRemoveProduct, setProducts } = useProductContext();
    const { addNotification } = useNotificationContext();

    // Define the callback function for removing a product
    const removeProduct = useCallback(async (productId) => {
        try {
            // Update local storage and context state
            const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
            const updatedProducts = storedProducts.filter((product) => product.id !== productId);
            localStorage.setItem("products", JSON.stringify(updatedProducts));
            setProducts(updatedProducts);

            // Send API request to delete the product
            await fetch(`http://localhost:3030/products/${productId}`, {
                method: "DELETE",
            });

            addNotification(`Product removed successfully!`);
        } catch (error) {
            addNotification(`Failed to sync product removal with API: ${error.message}`);
        }
    }, [addNotification, setProducts]);

    // Set the callback in the context
    useEffect(() => {
        setHandleRemoveProduct(() => removeProduct);
    }, [removeProduct, setHandleRemoveProduct]);

    return null;
}

export default ProductRemoverComponent;
