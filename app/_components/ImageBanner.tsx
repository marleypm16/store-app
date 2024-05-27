import React from 'react';
import Image from "next/image";

const ImageBanner = () => {
    return(
        <div className='p-5 text-center'>
            <Image src='/images/banner-home-01.png'
                   alt="Produtos com 55% de desconto"
                   width={0} height={0}
                   className='h-auto w-full object-cover'
                   sizes='100vw'/>
        </div>
    );
};

export default ImageBanner;