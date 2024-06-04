"use client";
import { Prisma } from '@prisma/client';
import React, {useMemo} from 'react';
import {Card, CardContent} from "@/app/_components/ui/card";
import {Separator} from "@/app/_components/ui/separator";
import {Format} from "@/app/_lib/format";
import Image from "next/image";
import {Button} from "@/app/_components/ui/button";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {ChevronLeftIcon} from "lucide-react";
interface OrderDetailsProps {
    order: Prisma.OrderGetPayload<{
        include:{
            orderProduct:{
                include:{
                    product:true
                }
            }
        }

    }>
}
const OrderDetails = ({order} : OrderDetailsProps) => {
    const router = useRouter();

    const subTotal = useMemo(() => {
            return order.orderProduct.reduce((acc, item) => acc + Number(item.product.basePrice) * item.quantity, 0)
        }
        , [order.orderProduct]);
    const total = Number(order.totalPrice);
    const totaldescount = subTotal - total;

    return (
        <>
            <Button onClick={() => router.back()} variant='outline'><ChevronLeftIcon/> Voltar</Button>
            <h2 className="pb-6 text-lg mt-3 font-semibold">Pedido : #{order.id}</h2>
            <div className='space-y-4'>
                <h2>Produtos</h2>
                <Card key={order.id} className='mb-4 mt-3'>
                    <CardContent className="p-5">
                        {order.orderProduct.map((orderProduct) => (
                            <>
                                <h2>{orderProduct.product.name}</h2>
                                <div className="flex items-center justify-between pt-3">
                                    <div>
                                        <Image src={orderProduct.product.imageUrls[0]} width={100}
                                               alt={orderProduct.product.name} height={100}/>
                                    </div>
                                    <div className="flex items-center gap-2 p-4">
                                    <span className="text-sm font-semibold">
                                    Quantidade : {orderProduct.quantity}
                                    </span>
                                        <span className="text-sm font-semibold">
                                    {Format.formatPrice(Number(orderProduct.basePrice))}
                                </span>
                                    </div>

                                </div>
                                <Button className='mt-4' variant='outline'><Link
                                    href={`/product/${orderProduct.product.id}`}>Ver Produto</Link></Button>
                                <div className="py-3">
                                    <Separator/>
                                </div>
                            </>

                        ))}
                    </CardContent>
                </Card>
                <Card key={order.id} className='mb-4 mt-3'>
                    <CardContent className="p-5">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between text-xs lg:text-sm">
                                <p>SubTotal</p>
                                <p>{Format.formatPrice(subTotal)}</p>
                            </div>
                            <Separator/>

                            <div className="flex items-center justify-between text-xs lg:text-sm">
                                <p>Descontos</p>
                                <p>{Format.formatPrice(totaldescount)}</p>
                            </div>
                            <Separator/>
                            <div className="flex items-center justify-between text-xs lg:text-sm">
                                <p>Entrega</p>
                                <p>GRÁTIS</p>
                            </div>

                            <Separator/>

                            <div className="flex items-center justify-between text-sm font-bold lg:text-base">
                                <p>Total</p>
                                <p>{Format.formatPrice(total)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </>

    );
};

export default OrderDetails;