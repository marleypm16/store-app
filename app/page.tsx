import Header from "@/app/_components/header";
import ImageBanner from "@/app/_components/ImageBanner";
import CategoryList from "./_components/CategoryList";
import {db} from "@/app/_lib/prisma";
import ProductList from "./_components/ProductList";
import React from "react";

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
    const mouses = await db.product.findMany({
        take:10,
        where:{
            category:{
                slug:'mouses'
            }
        }
    })
    const speakers = await db.product.findMany({
        take:10,
        where:{
            category:{
                slug:'speakers'
            }
        }
    });
  return (
      <>
          <Header/>
          <ImageBanner image={'01'} alt='Produtos com até 55% de desconto'/>
          <CategoryList/>
          <div className='p-5'>
              <h2 className='mb-4'>Ofertas</h2>
              <ProductList products={products}/>
          </div>
          <ImageBanner image={'02'} alt={'Mouses com até 55% de desconto'}/>
          <div className='p-5 md:flex flex-col  items-center'>
              <div>
                    <h2 className='mb-4'>Mouses</h2>
                    <ProductList products={mouses}/>
              </div>
          </div>
          <ImageBanner image={'03'} alt={'Fones com até 20% de desconto'}/>
          <div className='p-5 md:flex flex-col items-center'>
              <div>
                  <h2 className='mb-4'>Fones de Ouvido</h2>
                  <ProductList products={speakers}/>
              </div>

          </div>
      </>

  );
}
