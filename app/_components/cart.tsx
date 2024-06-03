"use client";
import { useCart } from '@/app/_context/cartContext';
import React from 'react';
import {Format} from "@/app/_lib/format";
import {Button} from "@/app/_components/ui/button";
import {OrderStatus} from "@prisma/client";
import {createOrder} from "@/app/_lib/createOrder";
import {ShoppingCartIcon} from "lucide-react";
import {Badge} from "@/app/_components/ui/badge";
import {ScrollArea} from "@/app/_components/ui/scroll-area";
import {Separator} from "@/app/_components/ui/separator";
import CartItem from "@/app/_components/cartItem";
const Cart = () => {
    const {cart,clearCart} = useCart();
    const handleCreateOrder = async () => {
        try {// Cria a ordem no banco de dados usando Prisma
            await createOrder({
                status: OrderStatus.PAYMENT_ACCEPTED,
                orderProduct:{
                    createMany:{
                        data: cart.map((item) => ({
                            productId: item.id,
                            quantity: item.quantity,
                            basePrice: item.totalPrice,
                        }))
                    },
                },
                totalPrice: Format.calculateTotalPrice(cart),
                totalQuantity: Format.calculateTotalQuantity(cart),
            })
            clearCart()
            console.log('Order created successfully:', cart);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    }
    return (
        <div>
            <div className="flex h-full flex-col gap-8">
                <Badge variant="default">
                    <ShoppingCartIcon size={16} />
                    Carrinho
                </Badge>

                {/* RENDERIZAR OS PRODUTOS */}
                <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="flex h-full flex-col gap-8">
                            {cart.length > 0 ? (
                                cart.map((product) => (
                                    <CartItem
                                        key={product.id}
                                        product={product}
                                    />
                                ))
                            ) : (
                                <p className="text-center font-semibold">
                                    Carrinho vazio. Vamos fazer compras?
                                </p>
                            )}
                        </div>
                    </ScrollArea>
                </div>

                {cart.length > 0 && (
                    <div className="flex flex-col gap-3">
                        <Separator />

                        <div className="flex items-center justify-between text-xs lg:text-sm">
                            <p>Subtotal</p>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between text-xs lg:text-sm">
                            <p>Entrega</p>
                            <p>GRÁTIS</p>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between text-sm font-bold lg:text-base">
                            <p>Total</p>
                        </div>

                        <Button
                            className="mt-7 font-bold uppercase"
                            onClick={handleCreateOrder}
                        >
                            Finalizar compra
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;