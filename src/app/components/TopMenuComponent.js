import React, { useState } from 'react';
import {useProductContext} from "@/app/context/ProductContext";

// TopMenuComponent.js
const TopMenuComponent = () => {
    const {
        handlePriceChange,
        handleCategoryChange,
        setIsFormVisible,
        selectedCategory,
        categories,
        minPrice,
        maxPrice,
    } = useProductContext();

    return (
        <div className="top-menu">
            <label>Price:</label>
            <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => handlePriceChange(e, 'min')}
            />
            <span> - </span>
            <input
                type="number"
                placeholder="Max"
                value={maxPrice}
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



            <style jsx>{`
                .top-menu {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px;
                    background-color: #f7f7f7;
                    border-bottom: 1px solid #ddd;
                }

                label {
                    font-weight: bold;
                }

                input, select {
                    padding: 5px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                .add-button {
                    background-color: #4285f4;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    font-size: 14px;
                    font-weight: bold;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-left: auto;
                }

                .add-button:hover {
                    background-color: #357ae8;
                }
            `}</style>
        </div>
    );
};

export default TopMenuComponent;
