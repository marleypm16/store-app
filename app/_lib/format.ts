import {CartProduct} from "@/app/_context/cartContext";
import {format} from "date-fns";
export class Format {

    static calculateTotalPrice(cart:CartProduct[]) : number{
        return cart.reduce((acc, item) => acc + item.totalPrice, 0)
    }
    static calculateTotalQuantity(cart:CartProduct[]) : number{
        return cart.reduce((acc, item) => acc + item.quantity, 0)
    }
    static formatDate(date: Date): string {
            return format(new Date(date), 'dd/MM/yyyy')
    }
    static formatPrice(basePrice: number): string {
        return Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(basePrice)
    }
    static calculateDiscount(basePrice: number, discountPercentage: number): number {
        return basePrice - (basePrice * discountPercentage / 100)
    }

}


