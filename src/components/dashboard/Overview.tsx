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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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


function Overview() {
    const { sales } = useSelector((state: any) => state.sale);

    // Get the past 7 days as Date objects
    const daysAgo = Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - index);
        date.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
        return date;
    });

    // Group objects by date and calculate total items for each day
    const groupedObjects = daysAgo.map(day => {
        const objectsForDay = sales.filter(obj => {
            const objDate = new Date(obj.createdAt.seconds * 1000 + obj.createdAt.nanoseconds / 1e6);
            objDate.setHours(0, 0, 0, 0);
            return (
                objDate.getFullYear() === day.getFullYear() &&
                objDate.getMonth() === day.getMonth() &&
                objDate.getDate() === day.getDate()
            );
        });

        // Calculate total items for the day
        const totalItemsForDay = objectsForDay.reduce((total, obj) => total + obj.totalItems, 0);
        const backgroundColor = `rgba(${255 + Math.floor(Math.random() * (6 - 0) + 6)}, ${160 + Math.floor(Math.random() * (6 - 0) + 6)}, 0, 0.9)`
        return { label: day.toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: '2-digit' }), data: totalItemsForDay, backgroundColor };
    });

    console.log(groupedObjects[2].data);




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
        },
    };

    //   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const labels = groupedObjects.map(x => x.label)

    const backGroundColors = ["rgba(255,119,3,1)", "rgba(94, 46, 3,.8)", "rgba(186,109,39,1)", "rgba(107, 49, 2)", "rgba(100, 70, 20)", "rgba(190, 88, 2)", "rgba(255, 162, 0)"]
    const data = {
        labels,
        // datasets: groupedObjects,
        datasets: [
            {
                label: "Sales",
                data: groupedObjects.map(x => x.data),
                backgroundColor: "rgba(3, 165, 252)"
            },
            {
                label: "Profit",
                data: groupedObjects.map(x => x.data),
                backgroundColor: "rgba(161, 200, 237)"
            }
        ],
    };
    return (

        <Card className="p-4">
            <CardHeader className="">

                <CardTitle className='text-2xl text-center font-bold mb-4'>Past Seven days Sales</CardTitle>
                <CardDescription className='flex flex-wrap'>

                    {/* {labels.map((x, index) => (
                        <p style={{ backgroundColor: backGroundColors[index] }} className='px-6 py-2 m-2 text-white' key={index}>{x}</p>
                    ))} */}
                </CardDescription>

            </CardHeader>
            <Bar options={options} data={data} />
        </Card>
    )
}

export default Overview