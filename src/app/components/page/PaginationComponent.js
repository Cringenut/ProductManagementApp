import React, { useState } from 'react';
import {useProductContext} from "@/app/context/ProductContext";
import ProductGrid from "@/app/components/page/ProductGridComponent";
import '../../../styles/Paginator.css';



const PaginationComponent = ({ itemsPerPage }) => {
    const {
        products,
        currentPage,
        setCurrentPage
    } = useProductContext();

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIdx, startIdx + itemsPerPage);

    return (
        <div>
            <ProductGrid currentProducts={currentProducts}/>
            <div className="paginator">
                <button
                    className="paginator-button"
                    onClick={() => handleClick(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {[...Array(totalPages).keys()].map((_, index) => (
                    <button
                        key={index}
                        className={`paginator-button ${
                            currentPage === index + 1 ? 'active' : ''
                        }`}
                        onClick={() => handleClick(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="paginator-button"
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
