import {format} from "date-fns";

export const formatPrice = (basePrice: number): string => {
        return Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(basePrice)
    }



export const formatDate = (date: Date): string => {
    return format(new Date(date), 'dd/MM/yyyy')
}
