import React from 'react';
import {Product} from "@prisma/client";
import Image from "next/image";
import {ArrowDownIcon} from "lucide-react";
import Link from "next/link";
import {Card, CardContent} from "@/app/_components/ui/card";
import {Badge} from "@/app/_components/ui/badge";
import { formatPrice } from "@/app/_lib/format";
import {calculateDiscount} from "@/app/_lib/calculate";
interface ProductItemProps {
    product : Product

}
const ProductItem = ({product}:ProductItemProps) => {
    const basePrice : number = Number(product.basePrice)
    return (
        <Link
            href={`/product/${product.id}`}
            className='w-[150px] min-w-[150px]'
        >
            <Card className="w-full mb-3 space-y-2 bg-secondary">
                <CardContent className="relative aspect-square w-full">
                    <Image
                        src={product.imageUrls[0]}
                        alt={product.name}
                        fill
                        sizes="100%"
                        className="rounded-lg p-7 object-cover shadow-md"
                    />

                    {product.discountPercentage ? (
                        <Badge className="absolute left-2 top-2 flex items-center bg-primary gap-[2px] rounded-full px-2 py-[2px] text-white">
                            <ArrowDownIcon size={12} />
                            <span className="text-xs font-semibold">
                            {product.discountPercentage}%
                            </span>
                        </Badge>
                    ) : null}
                </CardContent>
            </Card>
            <div>
                <h4 className="text-sm font-semibold">{product.name}</h4>
                    {product.discountPercentage ? (
                        <div className='flex items-center gap-3'>
                            <p className="text-sm ">{formatPrice(calculateDiscount(basePrice,product.discountPercentage))}</p>
                            <span className='text-sm line-through text-gray-500'>{formatPrice(basePrice)}</span>
                        </div>
                    ) : <p><p
                        className="text-sm ">{formatPrice(basePrice)}</p>
                    </p>
                    }
            </div>
        </Link>
    );
};

export default ProductItem;