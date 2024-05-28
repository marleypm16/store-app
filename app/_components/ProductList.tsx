import React from 'react';
import { Product} from "@prisma/client";
import ProductItem from "@/app/_components/ProductItem";

interface ProductListProps {
    products : Product[]
}
const ProductList = ({products}:ProductListProps) => {
    return (
        <div className='p-5'>
            <h1 className='mb-4'>Ofertas</h1>
            <div className="flex w-full gap-5 overflow-x-auto">
                {products.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

        </div>

    );
};

export default ProductList;