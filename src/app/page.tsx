import "./globals.css";
import MainPageComponent from "@/app/components/MainPageComponent";
import {ProductProvider} from "@/app/context/ProductContext";
import React from "react";

export default async function Home() {
    return (
        <html>
        <body>
        <ProductProvider>
            <MainPageComponent/>
        </ProductProvider>
        </body>
        </html>
    );
}
