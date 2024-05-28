export class Format {
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


