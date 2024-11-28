// MainPageComponent.js
"use client";

import { useState, useEffect } from "react";
import TopMenuComponent from "@/app/components/TopMenuComponent";
import ProductGrid from "@/app/components/ProductGridComponent";
import ProductInfoComponent from "@/app/components/ProductInfoComponent";
import ProductFormComponent from "@/app/components/ProductFormComponent";
import ProductEditComponent from "@/app/components/ProductEditComponent";
import {useProductContext} from "@/app/context/ProductContext";

export default function MainPageComponent() {
    const {
        isFormVisible,
        isEditFormVisible,
        setIsFormVisible,

    } = useProductContext();


    return (
        <>
            <TopMenuComponent/>
            <ProductGrid/>
            {isFormVisible && (
                <ProductFormComponent
                    onClose={() => setIsFormVisible(false)}
                />
            )}
        </>
    );
}
