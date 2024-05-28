import React from 'react';
import {db} from "@/app/_lib/prisma";
import CategoryItem from './CategoryItem';

const CategoryList = async () => {
    const categories = await db.category.findMany();
    return (
        <div className='grid p-5 gap-4 grid-cols-2 items-center'>
            {categories.map((category) => (
                <CategoryItem key={category.id} category={category}/>
            ))}
        </div>
    );
};

export default CategoryList;