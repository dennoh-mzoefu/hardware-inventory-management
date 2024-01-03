import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import OrderSectionItem from './OrderSectionItem'
import { useDispatch, useSelector } from 'react-redux'
import { ReceiptDialog } from './ReceiptDialog'
import { deleteAllPreOrder } from '@/redux/OrderSlice'

function OrderSection() {

    const { preOrder } = useSelector((state: any) => state.order);
    const [orderItem, setOrderItem] = useState(preOrder.map((item) => ({
        ...item,
        quantityToggled: 1,
        total: parseInt(item.sellingPrice),
    })))
    useEffect(() => {
        //compare preOrder and orderItem ids
        // let difference = {}
        const updateOrderItem = () => {
            const difference = preOrder.map(x => x.id).filter(item => !orderItem.map(x => x.id).includes(item))[0]
            const differenceObject = preOrder.filter(x => x.id === difference)[0]
            console.log("difference", differenceObject)
            const itemAdded = {
                ...differenceObject, quantityToggled: 1,
                total: parseInt(differenceObject.sellingPrice),
            }
            console.log("difference items addedd", itemAdded)
            setOrderItem((prevState) => [...prevState, itemAdded])
        }
        if (preOrder.length !== orderItem.length) {
            console.log("fasle");
        }

        // Check if every element in arr1 is included in arr2
        // console.log("Found",);

        !preOrder.map(x => x.id).every((element) => orderItem.map(x => x.id).includes(element)) && preOrder.length !== 0 && updateOrderItem()
    }, [preOrder])
    const [paid, setPaid] = useState(0)
    const [balance, setBalance] = useState(0)

    const dispatch = useDispatch()
    useEffect(() => {

        preOrder.length === 1 && orderItem.length === 0 && dispatch(deleteAllPreOrder())
    }, [orderItem])


    const [totalItems, setTotalItems] = useState(
        orderItem.reduce(
            (total, item) => total + item.total,
            0
        )
    )
    const [totalProfit, setTotalProfit] = useState(0)
    //calculate profit
    useEffect(() => {
        setTotalItems(
            orderItem.reduce(
                (total, item) => total + item.total,
                0
            )
        )
        setTotalProfit(
            orderItem.map(item => ({
                ...item,
                profit: (item.sellingPrice - item.buyingPrice) * item.quantityToggled,
            })).reduce((total, item) => total + item.profit, 0)
        )
    }, [orderItem])
    useEffect(() => {
        setBalance(paid - totalItems)
    }, [paid, totalItems])
    console.log({ orderItem })
    console.log({ preOrder })

    const handleCheckout = () => {

    }
    return (
        <div className='mx-auto'>
            <Card className='mx-auto my-3 md:max-w-[22vw] p-2'>
                {orderItem?.map((item: any, index: number) => {
                    return <OrderSectionItem key={index} items={orderItem} orderItem={item} setOrderItem={setOrderItem} />
                })}

                <Separator className="my-3" />
                <form onSubmit={handleCheckout}>
                    <CardFooter className="grid grid-cols-2 gap-2 content-center">
                        <div>
                            <div>
                                <Label htmlFor="text">Paid Amount</Label>
                                <Input id="productName" value={paid} onChange={e => {
                                    setPaid(e.target.value)
                                }} type="text" placeholder="PVC pipe" required />
                            </div>
                            <div>
                                <Label htmlFor="text">Total Items</Label>
                                <Input id="productName" value={totalItems} onChange={e => console.log("asa")} type="text" placeholder="PVC pipe" required />
                            </div>

                        </div>
                        <div>
                            <div>
                                <Label htmlFor="text">Balance</Label>
                                <Input id="productName" value={balance} onChange={e => console.log("asa")} type="text" placeholder="PVC pipe" required />
                            </div>
                            <div className='flex flex-col'>
                                <Label className='w-0' htmlFor="text"> .</Label>
                                {/* <Input id="productName" type="text" placeholder="PVC pipe" required /> */}
                                <ReceiptDialog setOrderItem={setOrderItem} orderItem={orderItem} balance={balance} paid={paid} totalItems={totalItems} totalProfit={totalProfit} />
                            </div>
                        </div>
                    </CardFooter>
                </form>

            </Card></div>
    )
}

export default OrderSection