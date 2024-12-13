import React from 'react';
import { useProductContext } from "@/app/context/ProductContext";
import "@/styles/TopMenu.css"

const TopMenuComponent = () => {
    const {
        dispatch,
        priceRange,
        selectedCategory,
        categories,
        handleCategoryFilter,
        handlePriceFilter
    } = useProductContext();

    const handlePriceChange = (e, type) => {
        const value = parseFloat(e.target.value) || 0;
        const updatedRange = {
            ...priceRange,
            [type]: value,
        };
        dispatch({ type: "SET_PRICE_RANGE", payload: updatedRange });
        handlePriceFilter(updatedRange);
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        dispatch({ type: "SET_SELECTED_CATEGORY", payload: category });
        handleCategoryFilter(category); // Call this to apply the filter.
    };

    return (
        <div className="top-menu">
            <label>Price:</label>
            <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => handlePriceChange(e, 'min')}
            />
            <span> - </span>
            <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => handlePriceChange(e, 'max')}
            />

            <label>Category:</label>
            <select value={selectedCategory || ''} onChange={handleCategoryChange}>
                <option value="">All</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <button className="add-button" onClick={() => dispatch({ type: "SET_FORM_VISIBILITY", payload: true })}>
                Add
            </button>
        </div>
    );
};

export default TopMenuComponent;
