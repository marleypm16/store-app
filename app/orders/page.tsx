import React from 'react';
import {db} from "@/app/_lib/prisma";
import Header from "@/app/_components/header";

import OrdersItem from "@/app/orders/_components/OrdersItem";

const OrdersPage = async () => {
    const orders = await db.order.findMany(
        {
            include:{
                orderProduct: {
                    include:{
                        product: true
                    }

                }
            }
        }
    );

    return (
        <>
            <Header />

            <div className="px-5 py-6">
                <h2 className="pb-6 text-lg font-semibold">Meus Pedidos</h2>

                <div className="space-y-4  ">
                    {orders.map((order) => (
                        <OrdersItem key={order.id} order={order} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default OrdersPage;