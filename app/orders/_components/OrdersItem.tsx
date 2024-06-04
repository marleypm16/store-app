"use client";
import React, {useEffect} from 'react';
import {Prisma} from "@prisma/client";
import {Card, CardContent} from "@/app/_components/ui/card";
import {Format} from "@/app/_lib/format";
import Link from "next/link";
import {updateOrderStatus} from "@/app/_lib/updateOrderStatus";
import {Separator} from "@/app/_components/ui/separator";
import {format} from "date-fns";
interface OrdersListProps {
    order : Prisma.OrderGetPayload<{
        include:{
            orderProduct:{
                include:{
                    product:true
                }
            }
        }
    }>
}

const OrdersItem = ({order}:OrdersListProps) => {
    useEffect(() => {
        const interval = setInterval(async () => {
            await updateOrderStatus(order.id, 'PAYMENT_ACCEPTED');
        }, 60000); // 60000 ms = 1 minuto

        return () => clearInterval(interval); // Limpar o intervalo quando o componente desmontar
    }, [order.id]);
    return (
        <Link href={`orders/${order.id}`}>
            <Card className='mb-4'>
                <CardContent className="p-5">
                    <h2>#{order.id}</h2>
                    <div
                        className={`w-fit rounded-full bg-[#EEEEEE] px-2 py-1 text-muted-foreground mt-3 ${order.status !== "WAITING_FOR_PAYMENT" && "bg-green-500 text-white"}`}
                    >
                      <span className="block text-xs font-semibold">
                          Pagamento: {order.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                            Data : {format(new Date(order.createdAt), 'dd/MM/yyyy')}
                        </span>
                        </div>

                    </div>

                    <div className="py-3">
                        <Separator />
                    </div>


                    <div className="flex items-center justify-between">
                        <p className="text-sm">Total: {Format.formatPrice(Number(order.totalPrice))}</p>
                    </div>
                </CardContent>
            </Card>
        </Link>

    );
};

export default OrdersItem;