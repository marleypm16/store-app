"use client";
import React from 'react';
import {useCart} from "@/app/_context/cartContext";
import {ShoppingCartIcon} from "lucide-react";
import {Button} from "@/app/_components/ui/button";

const CartIconButton = () => {
    const {cart} = useCart();

    return (
        <Button variant='outline' className='relative'>
            <ShoppingCartIcon/>
            {cart.length > 0 && <div className='absolute -top-2 -right-2'><div className='bg-primary text-white rounded-2xl p-1'>{cart.length}</div></div>}
        </Button>
    );
};

export default CartIconButton;