import React from 'react'
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function TodaySales() {
    const { sales } = useSelector((state: any) => state.sale);

    // const today = new Date();
    // today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

    // const objectsWithTodaysDate = sales.filter(obj => {
    //     // Convert obj.date to a JavaScript Date object
    //     const objDate = new Date(obj.createdAt.seconds * 1000 + obj.createdAt.nanoseconds / 1e6);

    //     // Set hours, minutes, seconds, and milliseconds to 0 for date comparison
    //     objDate.setHours(0, 0, 0, 0);
    //     console.log("today", today.getFullYear())
    //     // Compare year, month, and day parts
    //     return (
    //         objDate.getFullYear() === today.getFullYear() &&
    //         objDate.getMonth() === today.getMonth() &&
    //         objDate.getDate() === today.getDate()
    //     );
    // });

    // console.log(objectsWithTodaysDate);


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
            const { productName, total } = soldItem;
            const existingItem = productNameMap.get(productName);

            if (existingItem) {
                // If the productName already exists, update the total value
                existingItem.total += total;
            } else {
                // If the productName doesn't exist, add a new entry
                productNameMap.set(productName, { productName, total });
            }

            return productNameMap;
        }, new Map()).values()
    );

    console.log(uniqueProductNames);

    const options = {
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: "Today's sales",
                font: {
                    size: 25,
                    color: 'black'
                }
            },
        },
    };

    const labels = uniqueProductNames.map(x => x.productName)
    function dynamicColors() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgba(" + r + "," + g + "," + b + ", 0.6)";
    }
    const data = {
        labels,
        // datasets: groupedObjects,
        datasets: [{
            label: "Days Sale Total",
            data: uniqueProductNames.map(x => x.total),
            backgroundColor: [dynamicColors(), dynamicColors(), dynamicColors(), dynamicColors()]
        }],
    };
    return (
        <div>
            <Bar options={options} data={data} />
        </div>
    )
}

export default TodaySales