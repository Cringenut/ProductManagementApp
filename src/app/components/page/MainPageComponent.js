// MainPageComponent.js
"use client";

import React, { useCallback } from "react";
import TopMenuComponent from "@/app/components/page/TopMenuComponent";
import ProductFormComponent from "@/app/components/form/ProductFormComponent";
import ProductEditComponent from "@/app/components/form/ProductEditComponent";
import { useProductContext } from "@/app/context/ProductContext";
import PaginationComponent from "@/app/components/page/PaginationComponent";
import { useNotificationContext } from "@/app/context/NotificationContext";
import ProductFetcher from "@/app/backend/ProductFetcherComponent";
import ProductRemoverComponent from "@/app/backend/ProductRemoverComponent";
import ProductPutterComponent from "@/app/backend/ProductPutterComponent";
import TotalPriceComponent from "@/app/components/page/TotalPriceComponent";

export default function MainPageComponent() {
    const { addNotification } = useNotificationContext();
    const {
        isFormVisible,
        isEditFormVisible,
        dispatch,
        products
    } = useProductContext();

    const handleAddProduct = useCallback(async (newProduct) => {
        // Dispatch the new product
        dispatch({ type: "ADD_PRODUCT", payload: newProduct });
        addNotification("Product added successfully!");

        try {
            const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
            const updatedProducts = [...storedProducts, newProduct];
            localStorage.setItem("products", JSON.stringify(updatedProducts));

            // Sync with backend
            await fetch("http://localhost:3030/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });

            addNotification(`Product "${newProduct.name}" synced successfully with the API!`);
        } catch (error) {
            addNotification(`Failed to sync product with API: ${error.message}`);
        }
    }, [addNotification, dispatch]);

    const handleFormClose = () => {
        dispatch({ type: "SET_FORM_VISIBILITY", payload: false });
    };

    const handleEditFormClose = () => {
        dispatch({ type: "SET_EDIT_FORM_VISIBILITY", payload: false });
    };

    return (
        <div className="main-page">
            <TopMenuComponent />
            <PaginationComponent itemsPerPage={10} />
            {isFormVisible && (
                <ProductFormComponent
                    handleAddProduct={handleAddProduct}
                    onClose={handleFormClose}
                />
            )}
            {isEditFormVisible && (
                <ProductEditComponent onClose={handleEditFormClose} />
            )}
            <ProductFetcher />
            <ProductRemoverComponent />
            <ProductPutterComponent />
            <TotalPriceComponent />
        </div>
    );
}
