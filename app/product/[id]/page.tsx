import { db } from '@/app/_lib/prisma';
import React from 'react';
import {notFound} from "next/navigation";
import Header from "@/app/_components/header";
import ProductDetails from "@/app/product/[id]/_components/productDetails";
import ProductList from "@/app/_components/ProductList";
import ProductImages from "@/app/product/[id]/_components/ProductImages";
interface ProductPageProps {
    params: {
        id: string;
    }
}
const ProductPage = async ({params}:ProductPageProps) => {
    const product = await db.product.findUnique({
        where: {
            id: params.id
        }
    })
    const products = await db.product.findMany({take: 10});
    if (!product) {
        return  notFound();
    }
    return (
        <>
            <Header/>
            <div  className='p-5 '>

                    <ProductImages product={product}/>
                <div className='mt-4'>
                    <ProductDetails product={product}/>
                </div>
                <div className='mt-4'>
                    <h2 className='mb-4 '>Produtos que você também pode gostar</h2>
                    <ProductList products={products}/>
                </div>
            </div>
        </>
    );
};

export default ProductPage;