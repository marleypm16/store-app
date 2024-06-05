"use client";
import React from 'react';
import {Button} from "@/app/_components/ui/button";
import {ChevronLeftIcon} from "lucide-react";
import { useRouter } from 'next/navigation';

const GoBackButton = () => {
    const router = useRouter();
    return (
        <div className='px-5 py-6'>
            <Button  onClick={() => router.back()} variant='outline'><ChevronLeftIcon/> Voltar</Button>
        </div>

    );
};

export default GoBackButton;