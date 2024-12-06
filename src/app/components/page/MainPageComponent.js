// MainPageComponent.js
"use client";

import { useState, useEffect } from "react";
import TopMenuComponent from "@/app/components/page/TopMenuComponent";
import ProductGrid from "@/app/components/page/ProductGridComponent";
import ProductInfoComponent from "@/app/components/form/ProductInfoComponent";
import ProductFormComponent from "@/app/components/form/ProductFormComponent";
import ProductEditComponent from "@/app/components/form/ProductEditComponent";
import {useProductContext} from "@/app/context/ProductContext";

export default function MainPageComponent() {
    const {
        isFormVisible,
        isEditFormVisible,
        setIsFormVisible,
        setIsEditFormVisible
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
            {isEditFormVisible && (
                <ProductEditComponent
                    onClose={() => setIsEditFormVisible(false)}
                />
            )}
        </>
    );
}
