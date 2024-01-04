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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,

    Tooltip,
    Legend
);

function TodaySalesGrouped() {
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
            // title: {
            //     display: true,
            //     text: "Today's sales",
            //     font: {
            //         size: 25,
            //         color: 'black'
            //     }
            // },
        },
    };

    const labels = uniqueProductNames.map(x => x.orderId)

    const generateBlueShades = (baseColor, numShades) => {
        const shades = [];

        // Parse the base color into RGB values
        const baseRgb = hexToRgb(baseColor);

        // Generate shades by adjusting lightness
        for (let i = 0; i < numShades; i++) {
            const lightness = i / (numShades - 1); // Vary lightness from 0 to 1
            const shade = `hsl(${baseRgb.h}, ${baseRgb.s}%, ${lightness * 100}%)`;
            shades.push(shade);
        }

        return shades;
    };

    // Helper function to convert hex to RGB
    const hexToRgb = (hex) => {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return {
            r,
            g,
            b,
            h: rgbToHsl(r, g, b).h,
            s: rgbToHsl(r, g, b).s,
        };
    };

    // Helper function to convert RGB to HSL
    const rgbToHsl = (r, g, b) => {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    };

    // Example usage
    const baseColor = '#3498db'; // Replace with your desired base color
    const numShades = labels.length; // Adjust the number of shades as needed
    const blueShades = generateBlueShades(baseColor, numShades);

    console.log(blueShades);

    const data = {
        labels,
        // datasets: groupedObjects,
        datasets: [{
            data: uniqueProductNames.map(x => x.total),
            backgroundColor: blueShades,
        }],
    };
    return (
        <Card className="p-4">
            <CardHeader className="">

                <CardTitle className='text-2xl text-center font-bold mb-4'>Past Seven days Sales</CardTitle>
                <CardDescription className='flex flex-wrap'>

                    {labels.map((x, index) => (
                        <p style={{ backgroundColor: blueShades[index] }} className='px-6 py-2 m-2 text-white' key={index}>{x}</p>
                    ))}
                </CardDescription>

            </CardHeader>
            <Bar options={options} data={data} />
        </Card>
    )
}

export default TodaySalesGrouped