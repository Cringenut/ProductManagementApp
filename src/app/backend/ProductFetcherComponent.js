
export async function fetchProducts() {
    try {
        // Fetch the JSON file from the public folder
        const response = await fetch('http://localhost:3030/products');
        const productsData = await response.json();

        console.log("Products: ", productsData)

        return productsData;
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
}