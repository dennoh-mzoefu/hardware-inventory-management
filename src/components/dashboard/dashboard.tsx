import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import RecentSales from './RecentSales'
import Overview from './Overview'
import ProfitTodayCard from './ProfitTodayCard'
import MostProfitItem from './MostProfitItem'
import MostExpense from './MostExpense'
import TodaySaleTotal from './TodaySaleColor'
function Dashboard() {
    return (
        <div>
            <div value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <TodaySaleTotal />
                    <ProfitTodayCard />
                    <MostProfitItem />
                    <MostExpense />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Overview />
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                            <CardDescription>
                                You made 265 sales this month.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RecentSales />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Dashboard