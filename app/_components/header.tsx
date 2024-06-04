"use client";
import React from 'react';
import {Button} from "@/app/_components/ui/button";
import {BookTextIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/app/_components/ui/sheet";
import Cart from "@/app/_components/cart";
import CartIconButton from "@/app/_components/CartIconButton";
import {signIn,signOut,useSession} from "next-auth/react";
import {Separator} from "@/app/_components/ui/separator";
import {Avatar, AvatarFallback, AvatarImage} from "@/app/_components/ui/avatar";

const Header = () => {
    const {data} = useSession();
    const handleSignIn= () => signIn("github");
    const handleSignOut = () => signOut();
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
                        {data?.user ? (
                            <>
                                <div className="flex justify-between pt-6">
                                    <div className="flex items-center gap-3">


                                        <div className='flex items-center gap-4 '>
                                            <Avatar>
                                                <AvatarImage src={data?.user?.image as string | undefined} />
                                                <AvatarFallback>{data?.user?.name}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-semibold">{data?.user?.name}</h3>
                                                <span className="block text-xs text-muted-foreground">
                                                    {data?.user?.email}
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                            <div className="flex items-center justify-between pt-10">
                                    <h2 className="font-semibold">Olá. Faça seu login!</h2>
                                    <Button size="icon" onClick={handleSignIn}>
                                        <LogInIcon />
                                    </Button>
                                </div>
                            </>
                        )}

                        <div className="py-6">
                            <Separator />
                        </div>
                        <SheetDescription>
                            <div className="flex flex-col gap-3 px-5">
                                <Button variant="outline" className="justify-start" asChild>
                                    <Link href="/">
                                        <HomeIcon size={18} className="mr-2"/>
                                        Início
                                    </Link>
                                </Button>
                                {data?.user && (
                                    <Button variant="outline" className="justify-start" asChild>
                                        <Link href={`/orders`}>
                                            <BookTextIcon size={18} className="mr-2"/>
                                            Pedidos
                                        </Link>
                                    </Button>
                                )}
                            </div>
                            {data?.user && (
                                <Button
                                    variant="outline"
                                    className="w-full justify-start space-x-3  text-sm font-norma mt-4"
                                    onClick={handleSignOut}
                                >
                                    <LogOutIcon size={16} />
                                    <span className="block">Sair da conta</span>
                                </Button>
                            )}
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
            <Link href='/'><Image src='/images/logo.png' width={60} height={60} alt='logo'/></Link>
            <Sheet>
                <SheetTrigger>
                    <CartIconButton/>
                </SheetTrigger>
                <SheetContent className="w-[320px]">
                   <Cart/>
                </SheetContent>
            </Sheet>

        </div>
    );
};

export default Header;