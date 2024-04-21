import {createContext, useContext, useMemo, useState} from 'react';
import {Product} from "../types/apiCall.ts";
import {CartProduct} from "../types/utils.ts";

interface CartContextType {
    cart: CartProduct[];
    addProduct: (product: Product) => void;
    removeProduct: (productId: number) => void;
    getTotal: () => number;
    getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartProduct[]>([]);

    //Checks if the product is already in the cart, if it is, it increases the quantity, if not, it adds the product to the cart
    const addProduct = (product: Product) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(p => p.id === product.id);
            if (existingProductIndex !== -1) {
                const newCart = [...prevCart];
                newCart[existingProductIndex] = {...newCart[existingProductIndex], quantity: newCart[existingProductIndex].quantity + 1};
                return newCart;
            } else {
                return [...prevCart, {...product, quantity: 1}];
            }
        });
    };

    //Checks if the product is already in the cart, if it is, it decreases the quantity, if the quantity is 1, it removes the product from the cart
    const removeProduct = (productId: number) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(p => p.id === productId);
            if (existingProductIndex !== -1 && prevCart[existingProductIndex].quantity > 1) {
                const newCart = [...prevCart];
                newCart[existingProductIndex] = {...newCart[existingProductIndex], quantity: newCart[existingProductIndex].quantity - 1};
                return newCart;
            } else {
                return prevCart.filter(product => product.id !== productId);
            }
        });
    };

    //Calculates the total price of the products in the cart
    const getTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0);
    };

    //Calculates the total number of products in the cart
    const getItemCount = () => {
        return cart.reduce((total, product) => total + product.quantity, 0);
    };

    const value = useMemo(() => ({ cart, addProduct, removeProduct, getTotal, getItemCount }), [cart]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};