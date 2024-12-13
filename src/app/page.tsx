import "./globals.css";
import MainPageComponent from "@/app/components/page/MainPageComponent";
import {ProductProvider} from "@/app/context/ProductContext";
import React from "react";
import NotificationSystem from "@/app/components/page/NotificationSystem";
import {NotificationProvider} from "@/app/context/NotificationContext";
import ProductFetcher from "@/app/backend/ProductFetcherComponent";
import ProductAdderComponent from "@/app/backend/ProductAdderComponent";
import ProductRemoverComponent from "@/app/backend/ProductRemoverComponent";
import ProductPutterComponent from "@/app/backend/ProductPutterComponent";

export default async function Home() {
    return (
        <html>
        <body>
        <NotificationProvider>
            <ProductProvider>
                <NotificationSystem/>
                <MainPageComponent/>
            </ProductProvider>
        </NotificationProvider>
        </body>
        </html>
    );
}
