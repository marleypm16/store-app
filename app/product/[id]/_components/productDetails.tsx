"use client";
import React from 'react';
import { Product} from "@prisma/client";
import { formatPrice } from "@/app/_lib/format";
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
            duration: 1500
        })
        setQuantity(1);
    }
    return (
        <>
            <div className="flex flex-col px-5 lg:w-[40%] lg:rounded-lg lg:bg-accent lg:p-10">
                <h2 className="text-lg lg:text-2xl">{product.name}</h2>

                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold lg:text-3xl">
                         {formatPrice(totalPrice)}
                    </h1>
                    {product.discountPercentage > 0 && (
                        <Badge className="lg:text-base">
                            {product.discountPercentage}% OFF
                        </Badge>
                    )}
                </div>

                {product.discountPercentage > 0 && (
                    <p className="text-sm line-through opacity-75 lg:text-base">
                         {formatPrice(basePrice)}
                    </p>
                )}

                <div className="mt-4 flex items-center gap-2">
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={handleDecrementProductQuantity}
                    >
                        <ArrowLeftIcon size={16}/>
                    </Button>

                    <span>{quantity}</span>

                    <Button
                        size="icon"
                        variant="outline"
                        onClick={handleIncrementProductQuantity}
                    >
                        <ArrowRightIcon size={16}/>
                    </Button>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                    <h3 className="font-bold">Descrição</h3>
                    <p className="text-justify text-sm opacity-60">{product.description}</p>
                </div>

                <div className="mt-8 flex flex-col gap-5">

                    <Button className="font-bold uppercase" onClick={handleAddToCart}>
                        Adicionar ao carrinho
                    </Button>

                    <div className="flex items-center justify-between rounded-lg bg-accent px-5 py-2 lg:bg-[#2A2A2A]">
                        <div className="flex items-center gap-2">
                            <TruckIcon/>

                            <div className="flex flex-col">
                                <p className="text-xs">
                                    Entrega via <span className="font-bold">Correios®</span>
                                </p>
                                <p className="text-xs text-[#8162FF]">
                                    Envio para <span className="font-bold">todo Brasil</span>
                                </p>
                            </div>
                        </div>

                        <p className="text-xs font-bold">Frete grátis</p>
                    </div>
                </div>
            </div>
        <Toaster position='top-center'/>
        </>

    );
};

export default ProductDetails;