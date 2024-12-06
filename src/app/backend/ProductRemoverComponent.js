"use client";

import React, { useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import { fetchProducts } from "@/app/backend/ProductFetcherComponent";
import { useNotificationContext } from "../context/NotificationContext";

function ProductRemoverComponent() {
    const { setProducts, setFilteredProducts, setCategories, setHandleRemoveProduct } = useProductContext();
    const { addNotification } = useNotificationContext();

    const removeProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:3030/products/${productId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Update local context
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId)
            );
            setFilteredProducts((prevFiltered) =>
                prevFiltered.filter((product) => product.id !== productId)
            );

            // Fetch updated products to ensure consistency
            const products = await fetchProducts();
            setProducts(products);
            setFilteredProducts(products);

            // Update categories
            const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
            setCategories(uniqueCategories);

            addNotification(`Product removed successfully!`);
        } catch (error) {
            console.error("Error removing product:", error.message);
            addNotification(`Failed to remove product: ${error.message}`);
        }
    };

    useEffect(() => {
        setHandleRemoveProduct(() => removeProduct);
    }, [setHandleRemoveProduct]);

    return <></>;
}

export default ProductRemoverComponent;
