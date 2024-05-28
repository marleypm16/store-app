import React from 'react';
import Image from "next/image";
interface ImageBannerProps {
    image: string;
    alt : string
}
const ImageBanner = ({image,alt} :ImageBannerProps) => {
    return(
        <div className='p-5 text-center'>
            <Image src={`/images/banner-home-${image}.png`}
                   alt={alt}
                   width={0} height={0}
                   className='h-auto w-full object-cover'
                   sizes='100vw'/>
        </div>
    );
};

export default ImageBanner;