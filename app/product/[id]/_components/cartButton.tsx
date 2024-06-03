"use client";
import React from 'react';
import {Button} from "@/app/_components/ui/button";
import {CartProduct, useCart} from "@/app/_context/cartContext";
import { Product} from "@prisma/client";
import { toast } from "sonner";
import {Toaster} from "@/app/_components/ui/sonner";
interface CartButtonProps {
    product: Product;
}
const CartButton = ({product} : CartButtonProps) => {
    const {addToCart,quantity,calculateTotalPrice} = useCart();
    const totalPrice = calculateTotalPrice(product,Number(product.basePrice),quantity);
    const cartProduct : CartProduct = {...product, quantity: quantity,totalPrice}

    const handleAddToCart = () => {
        addToCart(cartProduct);
        toast.success("Item adicionado ao carrinho", {
            duration: 2000
        })
    }
    return (
        <>
            <Button onClick={handleAddToCart}>Adicionar ao Carrinho</Button>
            <Toaster/>
        </>

    );
};

export default CartButton;