import React from 'react';
import {Product} from "@prisma/client";
import {Format} from "@/app/_lib/format";
import ToggleQuantity from "@/app/product/[id]/_components/toggleQuantity";
import {Badge} from "@/app/_components/ui/badge";
interface ProductDetailsProps {
    product : Product;
}
const ProductDetails = ({product} : ProductDetailsProps) => {
    const basePrice : number = Number(product.basePrice);
    return (
        <div className='mb-4'>
            <div className='flex justify-between items-center'>
                <div className=''>
                    <h2>{product.name}</h2>
                    {product.discountPercentage > 0 && (
                        <div className='mt-2'>
                            <div className='flex items-center gap-4'>
                                <p className="text-sm ">{Format.formatPrice(Format.calculateDiscount(basePrice, product.discountPercentage))}</p>
                                <Badge className="bg-primary text-white">{product.discountPercentage}%</Badge>
                            </div>

                            <span className='text-sm line-through text-gray-500'>De {Format.formatPrice(basePrice)}</span>
                        </div>
                    )}
                    {!product.discountPercentage && (
                        <p className="text-sm ">{Format.formatPrice(basePrice)}</p>
                    )}
                </div>
                <div>
                <ToggleQuantity/>
                </div>
            </div>

        </div>
    );
};

export default ProductDetails;