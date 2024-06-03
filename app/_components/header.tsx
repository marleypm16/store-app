import React from 'react';
import {Button} from "@/app/_components/ui/button";
import {BookTextIcon, HomeIcon, MenuIcon, ShoppingCartIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/app/_components/ui/sheet";
import Cart from "@/app/_components/cart";

const Header = () => {
    return (
        <div className='p-5 border-b flex justify-between items-center'>
            <Sheet>
                <SheetTrigger>
                    <Button variant='outline'>
                        <MenuIcon/>
                    </Button></SheetTrigger>
                <SheetContent side='left'>
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                        <SheetDescription>
                            <div className="flex flex-col gap-3 px-5">
                                <Button variant="outline" className="justify-start" asChild>
                                    <Link href="/">
                                        <HomeIcon size={18} className="mr-2"/>
                                        Início
                                    </Link>
                                </Button>
                                <Button variant="outline" className="justify-start" asChild>
                                    <Link href={`/orders`}>
                                        <BookTextIcon size={18} className="mr-2"/>
                                        Pedidos
                                    </Link>
                                </Button>
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            <Link href='/'><Image src='/images/logo.png' width={60} height={60} alt='logo'/></Link>
            <Sheet>
                <SheetTrigger>
                    <Button variant='outline'>
                        <ShoppingCartIcon/>
                    </Button></SheetTrigger>
                <SheetContent className="w-[320px]">
                   <Cart/>
                </SheetContent>
            </Sheet>

        </div>
    );
};

export default Header;