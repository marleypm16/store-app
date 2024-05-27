import React from 'react';
import {Button} from "@/app/_components/ui/button";
import {MenuIcon, ShoppingCartIcon} from "lucide-react";
import Image from "next/image";

const Header = () => {
    return (
        <div className='p-5 border-b flex justify-between items-center'>
            <Button variant='secondary'>
                <MenuIcon/>
            </Button>

            <Image src='/images/logo.png' width={60} height={60} alt='logo'/>
            <Button variant='secondary'>
                <ShoppingCartIcon/>
            </Button>
        </div>
    );
};

export default Header;