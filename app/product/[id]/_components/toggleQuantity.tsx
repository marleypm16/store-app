"use client";
import React from 'react';
import {Button} from "@/app/_components/ui/button";
import {ArrowLeftIcon, ArrowRightIcon} from "lucide-react";

const ToggleQuantity = () => {
    const [quantity, setQuantity] = React.useState<number>(1);
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    }
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    return (
        <div className='flex items-center gap-5'>
            <Button onClick={handleDecrement} size='icon'><ArrowLeftIcon/></Button>
            <span>{quantity}</span>
            <Button size='icon' onClick={handleIncrement}><ArrowRightIcon/></Button>
        </div>
    );
};

export default ToggleQuantity;