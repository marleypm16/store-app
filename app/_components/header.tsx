"use client";
import React from 'react';
import {Button} from "@/app/_components/ui/button";
import {

    HomeIcon,
    LogInIcon,
    LogOutIcon,
    MenuIcon, PackageSearchIcon,

} from "lucide-react";
import Link from "next/link";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger
} from "@/app/_components/ui/sheet";
import Cart from "@/app/_components/cart";
import CartIconButton from "@/app/_components/CartIconButton";
import {signIn,signOut,useSession} from "next-auth/react";
import {Separator} from "@/app/_components/ui/separator";
import {Avatar, AvatarFallback, AvatarImage} from "@/app/_components/ui/avatar";
import { Card } from './ui/card';

const Header = () => {
    const {data,status} = useSession();
    const handleSignIn= () => signIn("google");
    const handleSignOut = () => signOut();
    return (
        <Card className="flex items-center justify-between p-[1.875rem]">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline">
                        <MenuIcon />
                    </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-[21.875rem]">
                    <SheetHeader className="text-left text-lg font-semibold">
                        Menu
                    </SheetHeader>

                    {status === "authenticated" && data?.user && (
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 py-4">
                                <Avatar>
                                    <AvatarFallback>
                                        {data.user.name?.[0].toUpperCase()}
                                    </AvatarFallback>

                                    {data.user.image && <AvatarImage src={data.user.image} />}
                                </Avatar>

                                <div className="flex flex-col">
                                    <p className="font-medium">{data.user.name}</p>
                                    <p className="text-sm opacity-75">Boas compras!</p>
                                </div>
                            </div>

                            <Separator />
                        </div>
                    )}

                    <div className="mt-4 flex flex-col gap-2">
                        {status === "unauthenticated" && (
                            <Button
                                onClick={handleSignIn}
                                variant="outline"
                                className="w-full justify-start gap-2"
                            >
                                <LogInIcon size={16} />
                                Fazer Login
                            </Button>
                        )}

                        {status === "authenticated" && (
                            <Button
                                onClick={handleSignOut}
                                variant="outline"
                                className="w-full justify-start gap-2"
                            >
                                <LogOutIcon size={16} />
                                Fazer Logout
                            </Button>
                        )}

                        <SheetClose asChild>
                            <Link href="/">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-2"
                                >
                                    <HomeIcon size={16} />
                                    Início
                                </Button>
                            </Link>
                        </SheetClose>

                        <SheetClose asChild>
                            <Link href={`/orders`}>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-2"
                                >
                                    <PackageSearchIcon size={16} />
                                    Meus Pedidos
                                </Button>
                            </Link>
                        </SheetClose>

                    </div>
                </SheetContent>
            </Sheet>

            <Link href="/">
                <h1 className="text-lg font-semibold">
                    <span className="text-primary">App</span> Store
                </h1>
            </Link>

            <Sheet>
                <SheetTrigger >
                    <CartIconButton />
                </SheetTrigger>

                <SheetContent className="w-[350px] lg:w-[600px] lg:max-w-[600px]">
                    <Cart />
                </SheetContent>
            </Sheet>
        </Card>
    );
};

export default Header;