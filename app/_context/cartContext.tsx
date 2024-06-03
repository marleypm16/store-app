"use client";
import React, {createContext, ReactNode, useContext, useState} from 'react';
import { Product} from "@prisma/client";
import {Format} from "@/app/_lib/format";

export interface CartProduct extends Product {
    quantity: number;
    totalPrice : number;
}

export interface CartContextProps {
    cart: CartProduct[];
    quantity: number;
    addToCart: (item: CartProduct) => void;
    handleIncrement: () => void;
    handleDecrement: () => void;
    calculateTotalPrice: (desconto: Pick<Product, "discountPercentage">, basePrice: number, quantity: number) => number;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}



export const CartContext = createContext<CartContextProps|undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartProduct[]>([]);
    const [quantity, setQuantity] = useState<number>(1);

    const addToCart =  (item: CartProduct) => {
        setCart((prevCart) => [...prevCart, item]);
    };
    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }
    const clearCart = () => {
        setCart([]);
    }
    const calculateTotalPrice = ( desconto: Pick<Product, "discountPercentage">,basePrice: number, quantity: number) => {
        if (desconto.discountPercentage > 0) {
            return Format.calculateDiscount(basePrice, desconto.discountPercentage) * quantity;
        }
        return basePrice * quantity;
    }
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    }
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }


    return (
        <CartContext.Provider value={{clearCart,removeFromCart,cart,addToCart,handleDecrement,handleIncrement,quantity,calculateTotalPrice}}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = (): CartContextProps => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
