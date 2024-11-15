import React, { useState } from 'react';

// TopMenuComponent.js
const TopMenuComponent = ({ onFilter, onCategoryFilter, selectedCategory, categories, onAddClick }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handlePriceChange = (e, type) => {
        const value = e.target.value;
        if (type === 'min') setMinPrice(value);
        if (type === 'max') setMaxPrice(value);

        onFilter({
            min: parseFloat(type === 'min' ? value : minPrice) || 0,
            max: parseFloat(type === 'max' ? value : maxPrice) || Infinity,
        });
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        onCategoryFilter(category);
    };

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

            <button className="add-button" onClick={onAddClick}>Add</button>

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
