import React from "react";
import {Product} from "../types/apiCall.ts";
import {createContext, useContext, useMemo, useState} from 'react';

interface ProductContextType {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    hasMore: boolean;
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
    sortHighest: () => void;
    sortLowest: () => void;
    sortHighestStock: () => void;
    sortHighestDiscount: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    //Variable that checks if there are more products to load (Load More Button)
    const [hasMore,setHasMore] = useState(false);

    const sortHighest = () => {
        const sortedProducts = [...products].sort((a, b) => b.price - a.price);
        setProducts(sortedProducts);
    };

    const sortLowest = () => {
        const sortedProducts = [...products].sort((a, b) => a.price - b.price);
        setProducts(sortedProducts);
    };


    const sortHighestStock = () => {
        const sortedProducts = [...products].sort((a, b) => b.stock - a.stock);
        setProducts(sortedProducts);
    }

    const sortHighestDiscount = () => {
        const sortedProducts = [...products].sort((a, b) => b.discountPercentage - a.discountPercentage);
        setProducts(sortedProducts);
    }


    const value = useMemo(() => ({ products, setProducts, hasMore, setHasMore, sortHighest, sortLowest, sortHighestStock, sortHighestDiscount }), [products]);

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};