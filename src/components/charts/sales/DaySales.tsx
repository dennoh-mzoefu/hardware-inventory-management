import React from 'react'
import { useSelector } from 'react-redux';

function DaySales() {
    const { sales } = useSelector((state: any) => state.sale);

    const targetDate = new Date('2023-08-15');
    targetDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

    const objectsWithTargetDate = sales.filter(obj => {
        // Convert obj.date to a JavaScript Date object
        const objDate = new Date(obj.createdAt.seconds * 1000 + obj.createdAt.nanoseconds / 1e6);

        // Set hours, minutes, seconds, and milliseconds to 0 for date comparison
        objDate.setHours(0, 0, 0, 0);

        // Compare year, month, and day parts
        return (
            objDate.getFullYear() === targetDate.getFullYear() &&
            objDate.getMonth() === targetDate.getMonth() &&
            objDate.getDate() === targetDate.getDate()
        );
    });

    console.log(objectsWithTargetDate);
    return (
        <div>DaySales</div>
    )
}

export default DaySales