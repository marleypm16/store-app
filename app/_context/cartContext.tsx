"use client";
import React, {createContext, ReactNode, useContext, useMemo, useState} from 'react';
import { Product} from "@prisma/client";
import {Format} from "@/app/_lib/format";

export interface CartProduct extends Product {
    quantity: number;
    totalPrice : number;
}

export interface CartContextProps {
    cart: CartProduct[];
    addToCart: (item: CartProduct) => void;
    handleIncrement: (productId:string) => void;
    handleDecrement: (productId:string) => void;
    calculateTotalPrice: (desconto: Pick<Product, "discountPercentage">, basePrice: number, quantity: number) => number;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    subTotal: number;
    total: number;
    totaldescount: number;
}



export const CartContext = createContext<CartContextProps|undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartProduct[]>([]);

    const addToCart = useMemo(() => (item: CartProduct) => {
        if (cart.some((cartItem) => cartItem.id === item.id)) {
            setCart((prevCart) => prevCart.map((cartItem) => {
                if (cartItem.id === item.id) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + item.quantity,
                    };
                }
                return cartItem;
            }));
            return;
        }
        setCart((prevCart) => [...prevCart, item]);
    }, [cart]);

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
    const handleIncrement = (productId:string) => {
        setCart((prevCart) => prevCart.map((item) => {
            if (item.id === productId) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            return item;

        }))
    }
    const handleDecrement = (productId:string) => {
       setCart((prevCart) => prevCart.map((item) => {
            if (item.id === productId) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                };
            }
            return item;
       }))
    }
    const subTotal = useMemo(() => {
            return cart.reduce((acc, item) => acc + Number(item.basePrice) * item.quantity, 0)
        }
    , [cart]);
    const total = useMemo(() => {
        return cart.reduce((acc, product) => {
            return acc + Format.calculateDiscount(Number(product.basePrice), product.discountPercentage) * product.quantity ;
        }, 0);
    }, [cart]);
    const totaldescount = subTotal - total;


    return (
        <CartContext.Provider value={{totaldescount,subTotal,total,clearCart,removeFromCart,cart,addToCart,handleDecrement,handleIncrement,calculateTotalPrice}}>
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
