import SevenDaySales from '@/components/charts/sales/SevenDaySales'
import TodaySales from '@/components/charts/sales/TodaySales'
import TodaySalesGrouped from '@/components/charts/sales/TodaySalesGrouped'
import React from 'react'

function SalesReport() {
    return (
        <div className='md:w-[70vw] mx-auto'>

            {/* <TodaySales /> */}
            <TodaySalesGrouped />
            <SevenDaySales /> </div>
    )
}

export default SalesReport