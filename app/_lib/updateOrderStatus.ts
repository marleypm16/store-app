"use server";
import {db} from "@/app/_lib/prisma";
import {OrderStatus} from "@prisma/client";

export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    await db.order.update({
        where: {
            id: orderId
        },
        data: {
            status: OrderStatus[status]
        }
    })
}