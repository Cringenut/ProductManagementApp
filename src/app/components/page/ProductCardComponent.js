import { memo } from 'react';
import '../../../styles/ProductCard.css';
import { useProductContext } from "@/app/context/ProductContext";

const ProductCard = memo(({ product }) => {
    const { handleRemoveProduct, handleInfoClick, handleEditClick } = useProductContext();

    console.log(`Rendering ProductCard for product ID: ${product.id}`);

    return (
        <div className="product-card">
            <button className="remove-button" onClick={() => handleRemoveProduct(product.id)}>
                x
            </button>
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">Category: {product.category}</p>
                <p className="product-amount">Amount: {product.quantity}</p>
                <p className="product-price">Price per unit: ${product.unitPrice}</p>
            </div>
            <button className="info-button" onClick={() => handleInfoClick(product)}>
                More Info
            </button>
            <button className="info-button" onClick={() => handleEditClick(product)}>
                Edit
            </button>
        </div>
    );
}, areEqual);

// Set the displayName for the memoized component
ProductCard.displayName = "ProductCard";

// Custom comparison function for React.memo
function areEqual(prevProps, nextProps) {
    return (
        prevProps.product.id === nextProps.product.id &&
        prevProps.product.name === nextProps.product.name &&
        prevProps.product.category === nextProps.product.category &&
        prevProps.product.quantity === nextProps.product.quantity &&
        prevProps.product.unitPrice === nextProps.product.unitPrice
    );
}

export default ProductCard;
