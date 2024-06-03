"use client";
import React from 'react';
import {Button} from "@/app/_components/ui/button";
import {ArrowLeftIcon, ArrowRightIcon} from "lucide-react";
import {useCart} from "@/app/_context/cartContext";

const ToggleQuantity = () => {
    const {handleIncrement, handleDecrement, quantity} = useCart();

    return (
        <div className='flex items-center gap-5'>
            <Button onClick={handleDecrement} size='icon'><ArrowLeftIcon/></Button>
            <span>{quantity}</span>
            <Button size='icon' onClick={handleIncrement}><ArrowRightIcon/></Button>
        </div>
    );
};

export default ToggleQuantity;