import React, { useState } from 'react';
import '../../../styles/ProuductGrid.css';

const PaginationComponent = ({ data, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentItems = data.slice(startIdx, startIdx + itemsPerPage);

    return (
        <div>
            <div className="product-grid">
                {currentItems.map((item, index) => (
                    <div key={index} className="product-card">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
            <div className="pagination-container">
                <button
                    className="pagination-button"
                    onClick={() => handleClick(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {[...Array(totalPages).keys()].map((_, index) => (
                    <button
                        key={index}
                        className={`pagination-button ${
                            currentPage === index + 1 ? 'active' : ''
                        }`}
                        onClick={() => handleClick(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="pagination-button"
                    onClick={() => handleClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationComponent;
