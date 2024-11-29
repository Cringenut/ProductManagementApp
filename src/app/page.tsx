import "./globals.css";
import MainPageComponent from "@/app/components/MainPageComponent";
import {ProductProvider} from "@/app/context/ProductContext";
import React from "react";
import NotificationSystem from "@/app/components/NotificationSystem";
import {NotificationProvider} from "@/app/context/NotificationContext";
import ProductFetcher from "@/app/backend/ProductFetcherComponent";

export default async function Home() {
    return (
        <html>
        <body>
        <NotificationProvider>
            <ProductProvider>
                <NotificationSystem/>
                <MainPageComponent/>
                <ProductFetcher/>
            </ProductProvider>
        </NotificationProvider>
        </body>
        </html>
    );
}
