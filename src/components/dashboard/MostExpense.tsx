import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useSelector } from 'react-redux'

function MostExpense() {
    const { expense } = useSelector(state => state.expense)
    const today = new Date().toISOString().split('T')[0];

    // Filter objects with today's date
    const todayExpenses = expense.filter(x => x.dateAdded === today);

    // Calculate total amount for today's expenses
    const totalAmount = todayExpenses.reduce((total, expense) => total + Number(expense.amount), 0);
    // const total = expense.map(x => Number(x.amount)).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    const highestAmountItem = todayExpenses.reduce((maxExpense, x) => {
        return Number(x.amount) > Number(maxExpense.amount) ? x : maxExpense;
    }, { amount: -Infinity });
    return (
        <div><Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Exense Today
                </CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Kes {totalAmount} </div>
                <p className="text-xs text-muted-foreground">
                    {Number(highestAmountItem.amount) > 0 ? <span>Highest expense today</span> : <span>No expenses recorded today</span>} {highestAmountItem?.expenseName}
                </p>
            </CardContent>
        </Card></div>
    )
}

export default MostExpense