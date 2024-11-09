import ProductGrid from "@/app/components/ProductGridComponent";
import "./globals.css";
import TopMenuComponent from "@/app/components/TopMenuComponent";
import path from "node:path";
import * as fs from "node:fs";
import MainPageComponent from "@/app/components/MainPageComponent";

async function fetchProducts() {
    const filePath = path.join(process.cwd(), 'src', 'data', 'products.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const productsData = JSON.parse(jsonData);
    return productsData.shop_items;
}

export default async function Home() {
    const products = await fetchProducts();

    return (
        <html>
        <body>
        <MainPageComponent serverProducts={products} />
        </body>
        </html>
    );
}
