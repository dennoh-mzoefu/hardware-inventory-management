import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useSelector } from 'react-redux'


function BadgePopOver({ setFormState }) {

    const { expense } = useSelector((state: any) => state.expense);
    const uniqueExpenseNames = [...new Set(expense.map(item => item.expenseName))];
    const [choseBadge, setChoseBadge] = useState("")
    console.log("uniqueExpenseNames", uniqueExpenseNames)
    const [mapArray, setMapArray] = useState([uniqueExpenseNames])
    useEffect(() => {

        const filteredArray = uniqueExpenseNames.filter(item => item.includes(choseBadge));
        console.log(choseBadge.trim().length === 0 ? "yes" : "no")
        setMapArray(choseBadge.trim().length === 0 ? uniqueExpenseNames : filteredArray)
    }, [choseBadge])

    return (
        <div><Popover>
            <PopoverTrigger id=""><Button variant="outline">Find Expense Name</Button></PopoverTrigger>
            <PopoverContent>
                <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Expense </Label>
                    <Input
                        id="width"
                        type='text'
                        placeholder="enter expense name"
                        className="col-span-2 h-8"
                        onChange={e => setChoseBadge(e.target.value)}
                    />
                </div>
                <div className='my-4 flex flex-wrap'>
                    {console.log("mapArray", mapArray)}
                    {mapArray.length > 0 ? (
                        mapArray.map((item: any) => (
                            <Badge
                                index={item}
                                className='m-2'
                                onClick={() => setFormState((prevState) => ({
                                    ...prevState, expenseName: item
                                }))}
                                variant="secondary">{ } {item}</Badge>
                        )))
                        :
                        (
                            choseBadge && <div><Badge onClick={() => setFormState((prevState) => ({
                                ...prevState, expenseName: choseBadge
                            }))}>{choseBadge}</Badge></div>
                        )
                    }


                </div>
            </PopoverContent>
        </Popover>
        </div>
    )
}

export default BadgePopOver