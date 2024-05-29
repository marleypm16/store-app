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
        <div className='flex items-center justify-center flex-col'>
            <Image className='bg-secondary mb-4' src={image} width={300} height={300}
                   alt={product.name}/>
            <div className='flex gap-3 justify-center items-center mx-5  min-w-[100px] max-w-full'>
                {product.imageUrls.map((image, index) => (
                    <Button key={index} onClick={() => handleImageChange(image)} className='bg-secondary' >
                        <Image className='bg-secondary' src={image} height={120} width={120} alt="Imagem do produto" />
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default ProductImages;