import React from "react";
import { useProductContext } from "@/app/context/ProductContext";

function TotalPriceComponent() {
    const { totalPrice } = useProductContext();

    return (
        <div
            style={{
                position: "fixed",
                bottom: "20px",
                left: "20px",
                backgroundColor: "#1976d2",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                fontFamily: "Arial, sans-serif",
                fontSize: "1rem",
                zIndex: 1000,
                fontWeight: "bold",
            }}
        >
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
    );
}

export default TotalPriceComponent;
