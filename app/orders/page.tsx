import React from 'react';
import {db} from "@/app/_lib/prisma";
import Header from "@/app/_components/header";
import {Format} from "@/app/_lib/format";
import {Card, CardContent} from "@/app/_components/ui/card";
import Link from "next/link";

const OrdersPage = async () => {
    const orders = await db.order.findMany(
        {
            include:{
                orderProduct: true
            }
        }
    );
    return (
        <>
            <Header/>
            <h2 className='text-center p-5'>Pedidos</h2>
            {orders.map(order => (
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

            ))}
        </>
    );
};

export default OrdersPage;