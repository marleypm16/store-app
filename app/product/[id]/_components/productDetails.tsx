"use client";
import React from 'react';
import { Product} from "@prisma/client";
import {Format} from "@/app/_lib/format";
import {Badge} from "@/app/_components/ui/badge";
import {ArrowLeftIcon, ArrowRightIcon, TruckIcon} from "lucide-react";
import {Button} from "@/app/_components/ui/button";
import {Toaster} from "@/app/_components/ui/sonner";
import {CartProduct, useCart} from "@/app/_context/cartContext";
import {toast} from "sonner";

interface ProductDetailsProps {
    product : Product;
}

const ProductDetails = ({product} : ProductDetailsProps) => {
    const basePrice : number = Number(product.basePrice);
    const [quantity,setQuantity] = React.useState(1);
    const handleIncrementProductQuantity = () => {
        setQuantity((prev) => prev + 1);
    }
    const handleDecrementProductQuantity = () => {
        if(quantity === 1) return;
        setQuantity((prev) => prev - 1);

    }
    const {addToCart,calculateTotalPrice} = useCart();
    const totalPrice = calculateTotalPrice(product,Number(product.basePrice),quantity);
    const cartProduct : CartProduct = {...product, quantity: quantity,totalPrice}
    const handleAddToCart = () => {
        addToCart(cartProduct);
        toast.success("Item adicionado ao carrinho", {
            duration: 1000
        })
        setQuantity(1);
    }
    return (
        <>
            <div className='mb-4 relative'>
                <div className='flex justify-between items-center'>
                    <div className=''>
                        <h2>{product.name}</h2>
                        {product.discountPercentage > 0 && (
                            <div className='mt-2'>
                                <div className='flex items-center gap-4'>
                                    <p className="text-sm ">{Format.formatPrice(Format.calculateDiscount(basePrice, product.discountPercentage))}</p>
                                    <Badge className="bg-primary text-white">{product.discountPercentage}%</Badge>
                                </div>

                                <span
                                    className='text-sm line-through text-gray-500'>De {Format.formatPrice(basePrice)}</span>
                            </div>
                        )}
                        {!product.discountPercentage && (
                            <p className="text-sm ">{Format.formatPrice(basePrice)}</p>
                        )}
                    </div>
                    <div>
                        <div className='flex items-center gap-5'>
                            <Button onClick={handleDecrementProductQuantity} size='icon'><ArrowLeftIcon/></Button>
                            <span>{quantity}</span>
                            <Button size='icon' onClick={handleIncrementProductQuantity}><ArrowRightIcon/></Button>
                        </div>
                    </div>
                </div>
                <span className='text-sm flex items-center gap-2 '><TruckIcon/>Entrega Grátis</span>
            </div>
            <Button onClick={handleAddToCart}>Adicionar ao Carrinho</Button>
            <Toaster  position='top-center'/>

        </>

    );
};

export default ProductDetails;