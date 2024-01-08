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

function TodaySaleTotal() {
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
            const { orderId, total } = soldItem;
            const existingItem = productNameMap.get(orderId);

            if (existingItem) {
                // If the orderId already exists, update the total value
                existingItem.total += total;
            } else {
                // If the orderId doesn't exist, add a new entry
                productNameMap.set(orderId, { orderId, total });
            }

            return productNameMap;
        }, new Map()).values()
    );
    const totalSales = uniqueProductNames.map((x: number) => x.total).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return (
        <div><Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Today Sales
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
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Kes {totalSales}</div>
                <p className="text-xs text-muted-foreground">
                    0% from yesterday <small className="text-xs">Kes </small>
                </p>
            </CardContent>
        </Card></div>
    )
}

export default TodaySaleTotal