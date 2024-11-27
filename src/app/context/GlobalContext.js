import React, { createContext, useReducer } from 'react';

export const GlobalContext = createContext();

const initialState = {
    products: [],
    filters: { category: null, priceRange: { min: 0, max: Infinity } },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'ADD_PRODUCT':
            return { ...state, products: [...state.products, action.payload] };
        case 'REMOVE_PRODUCT':
            return { ...state, products: state.products.filter(p => p.id !== action.payload) };
        case 'EDIT_PRODUCT':
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                ),
            };
        case 'SET_FILTERS':
            return { ...state, filters: action.payload };
        default:
            return state;
    }
};

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};
