import React from 'react';
import {db} from "@/app/_lib/prisma";
import OrderDetails from "@/app/orders/[id]/_component/OrderDetails";
import {notFound} from "next/navigation";
import Header from "@/app/_components/header";

interface OrderPageProps {
    params:{
        id: string;
}
}
const OrderPage = async ({params} : OrderPageProps) => {
    const order = await db.order.findUnique({
        where:{
            id: params.id
        },
        include:{
            orderProduct:{
                include:{
                    product:true
                }
            }
        }
    })
    if(!order){
        return notFound();
    }
    return (
        <div>
            <Header />

            <div className="px-5 py-6">
                <h2 className="pb-6 text-lg font-semibold">Pedido : #{order.id}</h2>

                <div className="space-y-4  ">
                    <OrderDetails order={order} />
                </div>
            </div>
        </div>
    );
};

export default OrderPage;