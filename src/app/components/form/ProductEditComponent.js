import React from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import "../../../styles/ProductForm.css";
import { useProductContext } from "@/app/context/ProductContext";

function ProductEditComponent({ onClose }) {
    const { selectedProduct, handleEditProduct } = useProductContext();

    const schema = yup.object().shape({
        name: yup
            .string()
            .min(3, "Name must be at least 3 characters")
            .required("Name is required"),
        category: yup
            .string()
            .min(3, "Category must be at least 3 characters")
            .required("Category is required"),
        amount: yup
            .number()
            .positive("Amount must be greater than 0")
            .integer("Amount must be an integer")
            .required("Amount is required"),
        unitPrice: yup
            .number()
            .positive("Price per unit must be greater than 0")
            .required("Price per unit is required"),
        supplier: yup
            .string()
            .min(3, "Supplier must be at least 3 characters")
            .required("Supplier is required"),
    });

    console.log("Selected Product:", selectedProduct); // Debugging

    if (!selectedProduct) {
        return <div>No product selected for editing</div>;
    }

    return (
        <div className="product-form-overlay" onClick={onClose}>
            <div className="product-form-content" onClick={(e) => e.stopPropagation()}>
                <h2>Edit Product</h2>
                <Formik
                    initialValues={{
                        name: selectedProduct.name || "",
                        category: selectedProduct.category || "",
                        amount: selectedProduct.amount || 1,
                        unitPrice: selectedProduct.unitPrice || 0.01,
                        supplier: selectedProduct.supplier || "",
                    }}
                    validationSchema={schema}
                    onSubmit={(formData) => {
                        console.log("Form Submitted:", formData); // Debugging
                        const updatedProduct = {
                            ...selectedProduct,
                            ...formData,
                        };
                        if (handleEditProduct) {
                            handleEditProduct(updatedProduct); // Debugging
                            console.log("Product Updated:", updatedProduct); // Debugging
                        } else {
                            console.error("handleEditProduct is undefined");
                        }
                        onClose();
                    }}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <Field type="text" name="name" placeholder="Enter product name" />
                            {errors.name && touched.name && <div>{errors.name}</div>}

                            <Field type="text" name="category" placeholder="Enter category" />
                            {errors.category && touched.category && <div>{errors.category}</div>}

                            <Field type="number" name="amount" placeholder="Enter amount" />
                            {errors.amount && touched.amount && <div>{errors.amount}</div>}

                            <Field
                                type="number"
                                step="0.01"
                                name="unitPrice"
                                placeholder="Enter price per unit"
                            />
                            {errors.unitPrice && touched.unitPrice && <div>{errors.unitPrice}</div>}

                            <Field type="text" name="supplier" placeholder="Enter supplier" />
                            {errors.supplier && touched.supplier && <div>{errors.supplier}</div>}

                            <button type="submit" disabled={isSubmitting}>
                                Save Changes
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default ProductEditComponent;
