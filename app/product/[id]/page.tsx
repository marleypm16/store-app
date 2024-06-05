import { db } from '@/app/_lib/prisma';
import React from 'react';
import {notFound} from "next/navigation";
import Header from "@/app/_components/header";
import ProductDetails from "@/app/product/[id]/_components/productDetails";
import ProductList from "@/app/_components/ProductList";
import ProductImages from "@/app/product/[id]/_components/ProductImages";
import GoBackButton from '@/app/_components/goBackButton';
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
            <GoBackButton/>
            <div className="flex flex-col gap-8 pb-8 lg:container lg:mx-auto lg:gap-10 lg:py-10">
                <div className="flex flex-col gap-8 lg:flex-row lg:gap-9  lg:px-5">
                    <ProductImages product={product} />
                    <ProductDetails product={product}/>
                </div>

                <div className="flex flex-col gap-5">
                    <h2 className="pl-5">Produtos Recomendados</h2>
                    <ProductList products={products}/>
                </div>
            </div>
        </>
    );
};

export default ProductPage;