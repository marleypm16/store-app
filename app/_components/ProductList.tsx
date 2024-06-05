import React from 'react';
import { Product} from "@prisma/client";
import ProductItem from "@/app/_components/ProductItem";

interface ProductListProps {
    products : Product[]
}
const ProductList = ({products}:ProductListProps) => {
    return (
            <div className="flex w-full  gap-6 overflow-x-auto sm:justify-start md:justify-center">
                {products.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>


    );
};

export default ProductList;