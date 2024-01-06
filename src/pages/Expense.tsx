import { ExpenseTable } from '@/components/expense/ExpenseTable'
import React from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Expense() {
    return (
        <div className='w-[90vw]'>
            <div className='flex w-[95vw] md:w-[77vw] justify-between '>
                <h2 className="text-2xl font-bold tracking-tight">Expense Tracking</h2>
                <Link to="/expense/add/new">
                    <IoAddCircleOutline className="text-3xl bg-destructive text-primary-foreground hover:bg-slate-900 rounded-full" />
                </Link>
            </div><ExpenseTable /></div>
    )
}

export default Expense