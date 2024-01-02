import React from 'react'
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams } from 'react-router-dom'
import { data } from './StockTable'

function EditStock() {
    const params = useParams()
    const stockItem = data.find(x => x.id === params.stockId)
    return (
        <div className="md:w-1/2 m-auto"><Card >
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Edit Stock {stockItem?.productName}</CardTitle>
                <CardDescription>
                    Edit Respective Fields
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {/* <div className="">
                    <Button className="w-full" variant="outline">
                        <Icons.google className="mr-2 h-4 w-4" />
                        Google
                    </Button>

                </div>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div> */}
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="password">Quantity</Label>
                        <Input id="password" type="number" />
                    </div>
                    <div>
                        <Label htmlFor="password">Buying Price</Label>
                        <Input id="password" type="number" />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Create account</Button>
            </CardFooter>
        </Card></div>
    )
}

export default EditStock