// ProductFormComponent.js
import * as yup from 'yup';
import {Field, Form, Formik} from "formik";
import "../../../styles/ProductForm.css"
import {useProductContext} from "@/app/context/ProductContext";

function ProductFormComponent({ onClose, handleAddProduct }) {
    const {
        categories
    } = useProductContext();


    const schema = yup.object().shape({
        name: yup
            .string()
            .min(3, "Name must be at least 3 characters")
            .required("Name is required"),
        category: yup
            .string()
            .min(3, "Category must be at least 3 characters")
            .oneOf(categories, "Category must be one of the predefined categories")
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

    return (
        <div className="product-form-overlay" onClick={onClose}>
            <div className="product-form-content" onClick={(e) => e.stopPropagation()}>
                <h2>Add Product</h2>
                <Formik
                    initialValues={{
                        name: "Product",
                        category: "Tools",
                        amount: 1,
                        unitPrice: 10.0,
                        supplier: "Supplier",
                    }}
                    validationSchema={schema} // Use the schema here
                    onSubmit={(formData, { resetForm }) => {
                        const newProduct = {
                            id: Date.now(), // Generate a unique ID
                            ...formData,
                        };
                        handleAddProduct(newProduct); // Add the new product
                        console.log(newProduct);
                        resetForm(); // Reset the form
                        onClose(); // Close the form
                    }}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <Field type="text" name="name" placeholder="Enter product name" />
                            {errors.name && touched.name && <div>{errors.name}</div>}

                            <Field type="text" name="category" placeholder="Enter category" />
                            {errors.category && touched.category && <div>{errors.category}</div>}

                            <Field type="number" name="amount" placeholder="Enter amount" />
                            {errors.quantity && touched.quantity && <div>{errors.quantity}</div>}

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
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default ProductFormComponent;
