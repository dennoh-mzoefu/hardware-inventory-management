import { MenuTable } from '@/components/menu/MenuTable'
import OrderSection from '@/components/menu/OrderSection'
import React from 'react'

function MenuPage() {
    return (
        <div className=''>
            <h2 className="text-2xl font-bold tracking-tight">Menu</h2>

            <div className='flex'>
                <MenuTable />
                <OrderSection />
            </div>
        </div>
    )
}

export default MenuPage