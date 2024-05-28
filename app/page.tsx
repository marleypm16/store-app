import Header from "@/app/_components/header";
import ImageBanner from "@/app/_components/ImageBanner";
import CategoryList from "./_components/CategoryList";
import {db} from "@/app/_lib/prisma";
import ProductList from "./_components/ProductList";

export default async function  Home()  {
    const products = await db.product.findMany({
        take:10,
        where:{
            discountPercentage:{
                not:{
                    equals:0
                }
            }
        }
    });
  return (
      <>
        <Header/>
        <ImageBanner/>
          <CategoryList/>
          <ProductList products={products}/>

      </>

  );
}
