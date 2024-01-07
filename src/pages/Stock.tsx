import { StockTable } from '@/components/stock/StockTable'
import { DemoTable } from '@/components/stock/DemoTable'
import React from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Stock() {

    return (
        <div className='w-[90vw]'>
            <div className='flex w-[95vw] md:w-[77vw] justify-between '>
                <h2 className="text-2xl font-bold tracking-tight">Stock Management</h2>
                <Link to="/stock/add">
                    <IoAddCircleOutline className="text-3xl bg-primary text-primary-foreground hover:bg-slate-900 rounded-full" />
                </Link>
            </div>
            <StockTable /></div>
    )
}

export default Stock