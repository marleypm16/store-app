import React from 'react';
import {db} from "@/app/_lib/prisma";
import Header from "@/app/_components/header";
import {notFound} from "next/navigation";
import Image from "next/image";
import ProductItem from "@/app/_components/ProductItem";
import GoBackButton from "@/app/_components/goBackButton";
interface CategoryPageProps {
    params: {
        id: string;
    };
}

const CategoryPage = async ({params} : CategoryPageProps) => {
    const category = await db.category.findUnique({
        where: {
            id: params.id
        },
        include:{
            products: true
        }
    })
    if(!category) {
        return notFound()
    }
    return (
        <>
            <Header/>
            <GoBackButton/>
            <div className='p-4 flex items-center  gap-3 border-b'>
                <Image src={category.imageUrl} alt={category.slug} height={30} width={30}/>
                <h1>{category.name}</h1>
            </div>
            <div className='flex mt-4 flex-wrap items-center justify-around gap-4'>
                {category.products.map(product => (
                    <ProductItem key={product.id} product={product}/>
                ))}
            </div>
        </>
    );
};

export default CategoryPage;