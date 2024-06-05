import React from 'react';
import {Category} from "@prisma/client";
import Link from "next/link";
import {Button} from "@/app/_components/ui/button";
import Image from "next/image";

interface CategoryItemProps {
    category: Category
}
const CategoryItem = ({category} : CategoryItemProps) => {
    return (
        <div className='min-w-full md:min-w-0 md:w-auto  '>
            <Link href={`/category/${category.id}`}>
                <Button className='w-full gap-3 flex items-center md:w-auto  ' variant='outline'>
                    <Image src={category.imageUrl} alt={category.slug} height={30} width={30}/>
                    {category.name}
                </Button>
            </Link>
        </div>
    );
};

export default CategoryItem;