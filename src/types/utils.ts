import {Product} from "./apiCall.ts";

export interface CategoryButtonProps {
    key: string;
    category: string;
}

export interface CartProduct extends Product {
    quantity: number;
}
