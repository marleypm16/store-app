"use client";
import React, {useEffect} from 'react';
import {Order} from "@prisma/client";
import {Card, CardContent} from "@/app/_components/ui/card";
import {Format} from "@/app/_lib/format";
import Link from "next/link";
import {updateOrderStatus} from "@/app/_lib/updateOrderStatus";
interface OrdersListProps {
    order : Order
}

const OrdersItem = ({order}:OrdersListProps) => {
    useEffect(() => {
        const interval = setInterval(async () => {
            await updateOrderStatus(order.id, 'PAYMENT_ACCEPTED');
        }, 60000); // 60000 ms = 1 minuto

        return () => clearInterval(interval); // Limpar o intervalo quando o componente desmontar
    }, [order.id]);
    return (
        <div>
            <Link key={order.id} className='mx-3' href={`/orders/${order.id}`}>
                <Card className='p-5'>
                    <CardContent>
                        <p># {order.id}</p>
                        <p>Data: {Format.formatDate(order.createdAt)}</p>
                        <p>Quantidade: {order.totalQuantity}</p>
                        <p>Valor total: {Format.formatPrice(Number(order.totalPrice))}</p>
                        <p>Status: {order.status}</p>
                    </CardContent>
                </Card>
            </Link>
        </div>
    );
};

export default OrdersItem;