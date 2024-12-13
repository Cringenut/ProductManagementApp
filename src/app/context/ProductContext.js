"use client";

import React, {createContext, useReducer, useContext, useEffect, useMemo} from "react";

const ProductContext = createContext(null);

const initialState = {
    products: [],
    categories: [],
    filteredProducts: [],
    selectedCategory: null,
    priceRange: { min: 0, max: Infinity },
    selectedProduct: null,
    isFormVisible: false,
    isEditFormVisible: false,
    currentPage: 1,
    totalPrice: 0,
};

function productReducer(state, action) {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        case "SET_CATEGORIES":
            return { ...state, categories: action.payload };
        case "SET_FILTERED_PRODUCTS":
            return { ...state, filteredProducts: action.payload };
        case "SET_SELECTED_CATEGORY":
            return { ...state, selectedCategory: action.payload };
        case "SET_PRICE_RANGE":
            return { ...state, priceRange: action.payload };
        case "SET_SELECTED_PRODUCT":
            return { ...state, selectedProduct: action.payload };
        case "SET_FORM_VISIBILITY":
            return { ...state, isFormVisible: action.payload };
        case "SET_EDIT_FORM_VISIBILITY":
            return { ...state, isEditFormVisible: action.payload };
        case "SET_CURRENT_PAGE":
            return { ...state, currentPage: action.payload };
        case "REMOVE_PRODUCT":
            return {
                ...state,
                products: state.products.filter((product) => product.id !== action.payload),
            };
        case "ADD_PRODUCT":
            return { ...state, products: [...state.products, action.payload] };
        case "UPDATE_PRODUCT":
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.payload.id ? action.payload : product
                ),
            };
        case "SET_TOTAL_PRICE":
            return { ...state, totalPrice: action.payload };
        default:
            return state;
    }
}


export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    const handlePriceFilter = ({ min = 0, max = Infinity }) => {
        dispatch({ type: "SET_PRICE_RANGE", payload: { min, max } });
        const filtered = applyFilters(state.products, state.selectedCategory, { min, max });
        dispatch({ type: "SET_FILTERED_PRODUCTS", payload: filtered });
    };

    const handleCategoryFilter = (category) => {
        console.log("CATEGORY CHANGED");
        dispatch({ type: "SET_SELECTED_CATEGORY", payload: category });

        // Apply filtering based on category and price range
        const filtered = state.products.filter((product) => {
            const matchesCategory = !category || product.category === category;
            const isWithinPriceRange =
                product.unitPrice >= state.priceRange.min &&
                product.unitPrice <= state.priceRange.max;
            return matchesCategory && isWithinPriceRange;
        });

        dispatch({ type: "SET_FILTERED_PRODUCTS", payload: filtered });
    };

    useEffect(() => {
        const loadProducts = async () => {
            const storedProducts = localStorage.getItem("products");
            if (storedProducts) {
                dispatch({ type: "SET_PRODUCTS", payload: JSON.parse(storedProducts) });
            } else {
                const fetchedProducts = await fetchProducts();
                dispatch({ type: "SET_PRODUCTS", payload: fetchedProducts });
                localStorage.setItem("products", JSON.stringify(fetchedProducts));
            }
        };
        loadProducts();
    }, []);

    const totalPrice = useMemo(() => {
        return state.products.reduce((sum, product) => {
            const quantity = parseFloat(product.quantity) || 0;
            const unitPrice = parseFloat(product.unitPrice) || 0;
            return sum + quantity * unitPrice;
        }, 0);
    }, [state.products]);

    useEffect(() => {
        dispatch({ type: "SET_TOTAL_PRICE", payload: totalPrice });
    }, [totalPrice, dispatch]);

    const value = {
        ...state,
        dispatch,
        handlePriceFilter,
        handleCategoryFilter,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => useContext(ProductContext);
