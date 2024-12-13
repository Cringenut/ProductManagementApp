// MainPageComponent.js
"use client";

import React, {useState, useEffect, useCallback} from "react";
import TopMenuComponent from "@/app/components/page/TopMenuComponent";
import ProductFormComponent from "@/app/components/form/ProductFormComponent";
import ProductEditComponent from "@/app/components/form/ProductEditComponent";
import {useProductContext} from "@/app/context/ProductContext";
import PaginationComponent from "@/app/components/page/PaginationComponent";
import {useNotificationContext} from "@/app/context/NotificationContext";
import ProductFetcher from "@/app/backend/ProductFetcherComponent";
import ProductRemoverComponent from "@/app/backend/ProductRemoverComponent";
import ProductPutterComponent from "@/app/backend/ProductPutterComponent";
import TotalPriceComponent from "@/app/components/page/TotalPriceComponent";

export default function MainPageComponent() {
    const { addNotification } = useNotificationContext();
    const {
        isFormVisible,
        isEditFormVisible,
        setIsFormVisible,
        setIsEditFormVisible,
        setProducts,
    } = useProductContext();

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

    return (
        <div className="main-page">
            <TopMenuComponent/>
            <PaginationComponent itemsPerPage={10}/>
            {isFormVisible && (
                <ProductFormComponent
                    handleAddProduct={ handleAddProduct }
                    onClose={() => setIsFormVisible(false)}
                />
            )}
            {isEditFormVisible && (
                <ProductEditComponent
                    onClose={() => setIsEditFormVisible(false)}
                />
            )}
            <ProductFetcher/>
            <ProductRemoverComponent/>
            <ProductPutterComponent/>
            <TotalPriceComponent/>
        </div>
    );
}
