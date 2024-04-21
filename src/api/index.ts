import {BASE_URL} from "./config.ts";
import { Product, ProductResponse} from "../types/apiCall.ts";

export async function getProducts(limit: number, skip: number): Promise<ProductResponse> {
    try {
        const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function getProduct(id: string): Promise<Product> {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}

export async function searchProducts(query: string): Promise<ProductResponse> {
    try {
        const response = await fetch(`${BASE_URL}/search?q=${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
}

export async function getCategories(): Promise<string[]> {
    try {
        const response = await fetch(`${BASE_URL}/categories`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export async function getCategoryProducts(category: string): Promise<ProductResponse> {
    try {
        const response = await fetch(`${BASE_URL}/category/${category}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching category products:', error);
        throw error;
    }
}
