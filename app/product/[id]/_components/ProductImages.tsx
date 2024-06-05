"use client";
import React from 'react';
import Image from "next/image";
import { Product } from '@prisma/client';
import {Button} from "@/app/_components/ui/button";
interface ProductImagesProps {
    product : Product;
}
const ProductImages = ({product}:ProductImagesProps) => {
    const [image,setImage] = React.useState<string>(product.imageUrls[0]);
    const handleImageChange = (image:string) =>{
        setImage(image)
    }
    return (
        <div className='flex flex-col md:min-h-full lg:w-3/5'>
            <div className='flex h-[380px] w-full bg-accent items-center justify-center md:h-full md:rounded-lg '>
                <Image className='h-auto max-h-[70%] w-auto max-w-[80%] object-contain' src={image} width={0} height={0}
                       alt={product.name} sizes='100vw'/>
            </div>

            <div className='mt-8 grid grid-cols-4 gap-4 px-5 lg:px-0'>
                    {product.imageUrls.map((image, index) => (
                        <Button key={index} onClick={() => handleImageChange(image)} className='flex  items-center justify-center rounded-lg bg-accent h-auto'>
                            <Image className='h-auto max-h-[70%] w-auto max-w-[80%]' src={image} sizes='100vw' height={0} width={0}
                                   alt={product.name}/>
                        </Button>
                    ))}
            </div>
        </div>

    );
};

export default ProductImages;