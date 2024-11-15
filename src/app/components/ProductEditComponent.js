import React, { useState } from 'react';
import * as yup from 'yup';
import "../../styles/ProductForm.css";

function ProductEditComponent({ product, onEdit, onClose }) {
    const [name, setName] = useState(product.name);
    const [category, setCategory] = useState(product.category);
    const [amount, setAmount] = useState(product.amount);
    const [price, setPrice] = useState(product.price_per_unit);
    const [supplier, setSupplier] = useState(product.supplier);
    const [errors, setErrors] = useState({});

    const schema = yup.object().shape({
        name: yup.string().min(3).required(),
        category: yup.string().required(),
        amount: yup.number().positive().integer().required(),
        price: yup.number().positive(),
        supplier: yup.string().min(3).required(),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProduct = { id: product.id, name, category, amount, price_per_unit: price, supplier };

        try {
            console.log(schema.validate(updatedProduct))
            await schema.validate(updatedProduct, { abortEarly: false });
            setErrors({});
            onEdit(updatedProduct);
        } catch (validationError) {
            const validationErrors = {};
            validationError.inner.forEach((err) => {
                validationErrors[err.path] = err.message;
            });
            setErrors(validationErrors);
        }
    };

    return (
        <div className="product-form-overlay" onClick={onClose}>
            <div className="product-form-content" onClick={(e) => e.stopPropagation()}>
                <h2>Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                    {errors.name && <div>{errors.name}</div>}

                    <input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Category"
                    />
                    {errors.category && <div>{errors.category}</div>}

                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        placeholder="Amount"
                    />
                    {errors.amount && <div>{errors.amount}</div>}

                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value.replace(',', '.')) || '')}
                        placeholder="Price"
                    />
                    {errors.price && <div>{errors.price}</div>}

                    <input
                        value={supplier}
                        onChange={(e) => setSupplier(e.target.value)}
                        placeholder="Supplier"
                    />
                    {errors.supplier && <div>{errors.supplier}</div>}

                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProductEditComponent;
