"use client";

import React, { useEffect } from "react";
import { useProductContext } from "@/app/context/ProductContext";
import { useNotificationContext } from "@/app/context/NotificationContext";

function ProductPutterComponent() {
    const { setHandleEditProduct, setProducts } = useProductContext();
    const { addNotification } = useNotificationContext();

    const updateProduct = async (updatedProduct) => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const updatedProducts = storedProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
        );
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        setProducts(updatedProducts);

        try {
            await fetch(`http://localhost:3030/products/${updatedProduct.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct),
            });
            addNotification(`Product "${updatedProduct.name}" updated successfully!`);
        } catch (error) {
            addNotification(`Failed to sync product update with API: ${error.message}`);
        }
    };

    useEffect(() => {
        setHandleEditProduct(() => updateProduct);
    }, [setHandleEditProduct]);

    return null;
}

export default ProductPutterComponent;
