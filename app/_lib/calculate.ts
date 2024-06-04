import {CartProduct} from "@/app/_context/cartContext";
export const calculateTotalPrice = (cart:CartProduct[]) : number =>{
    return cart.reduce((acc, item) => acc + item.totalPrice, 0)
}
export const  calculateTotalQuantity = (cart:CartProduct[]) : number =>{
    return cart.reduce((acc, item) => acc + item.quantity, 0)
}
export const calculateDiscount = (basePrice: number, discountPercentage: number): number => {
    return basePrice - (basePrice * discountPercentage / 100)
}
