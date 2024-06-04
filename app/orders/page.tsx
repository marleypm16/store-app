import React from 'react';
import {db} from "@/app/_lib/prisma";
import Header from "@/app/_components/header";

import OrdersItem from "@/app/orders/_components/OrdersItem";

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
                <OrdersItem key={order.id} order={order}></OrdersItem>
            ))}
        </>
    );
};

export default OrdersPage;