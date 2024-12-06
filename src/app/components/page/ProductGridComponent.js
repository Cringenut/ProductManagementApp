import React from 'react';
import { FixedSizeList as List } from 'react-window';
import ProductCard from "./ProductCardComponent";
import '../../../styles/ProuductGrid.css';

const ProductGrid = ({ currentProducts }) => {
    const Row = ({ index, style }) => (
        <div style={style}>
            <ProductCard product={currentProducts[index]} />
        </div>
    );

    return (
        <List
            height={500}
            itemCount={currentProducts.length}
            itemSize={250}
            width={'100%'}
        >
            {Row}
        </List>
    );
};

export default ProductGrid;
