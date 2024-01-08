import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useSelector } from 'react-redux';

function ProfitTodayCard() {
    const { sales } = useSelector((state: any) => state.sale);

    // Get today's date in the format 'YYYY-MM-DD'
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

    // Filter objects with today's date
    const objectsWithTodaysDate = sales.filter(obj => {
        const objDate = new Date(obj.createdAt.seconds * 1000 + obj.createdAt.nanoseconds / 1e6);
        objDate.setHours(0, 0, 0, 0);
        return objDate.getTime() === today.getTime();
    });

    // Join the soldItems arrays for objects with today's date
    const joinedSoldItems = objectsWithTodaysDate.reduce((acc, obj) => {
        return acc.concat(obj.soldItems);
    }, []);

    // Create a new array of unique productNames with their summed total values
    const uniqueProductNames = Array.from(
        joinedSoldItems.reduce((productNameMap, soldItem) => {
            const { orderId, profit } = soldItem;
            const existingItem = productNameMap.get(orderId);

            if (existingItem) {
                // If the orderId already exists, update the total value
                existingItem.profit += profit;
            } else {
                // If the orderId doesn't exist, add a new entry
                productNameMap.set(orderId, { orderId, profit });
            }

            return productNameMap;
        }, new Map()).values()
    );
    const totalProfit = uniqueProductNames.map((x: number) => x.profit).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return (
        <div> <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Profit Generated Today
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Kes {totalProfit}</div>
                <p className="text-xs text-muted-foreground">
                    +0% from yesterday
                </p>
            </CardContent>
        </Card></div>
    )
}

export default ProfitTodayCard