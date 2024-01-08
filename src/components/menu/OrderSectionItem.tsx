import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useDispatch, useSelector } from 'react-redux'
import { deletePreOrder } from '@/redux/OrderSlice'
function OrderSectionItem({ orderItem, setOrderItem, items }) {

    const handleAdd = () => {
        setOrderItem((prevArray) =>
            prevArray.map((item) =>
                item.id === orderItem.id ? { ...item, quantityToggled: item.quantityToggled + 1 } : item
            )
        );
    }

    const handleMinus = () => {
        orderItem.quantityToggled > 0 && setOrderItem((prevArray) =>
            prevArray.map((item) =>
                item.id === orderItem.id ? { ...item, quantityToggled: item.quantityToggled - 1 } : item
            )
        );
        // quantity > 0 && setQuantity((prevState) => prevState - 1)
    }

    const handleInputChange = (itemId, newQuantity) => {
        orderItem.quantityToggled < orderItem.quantity && setOrderItem((prevArray) =>
            prevArray.map((item) =>
                item.id === itemId ? { ...item, quantityToggled: newQuantity } : item
            )
        );
    };


    useEffect(() => {
        setOrderItem((prevArray) =>
            prevArray.map((item) =>
                item.id === orderItem.id ? { ...item, profit: item.quantityToggled * (orderItem.sellingPrice - orderItem.buyingPrice), total: item.quantityToggled * orderItem.sellingPrice } : item
            )
        );
        // setTotal(quantity * orderItem.sellingPrice)
    }, [orderItem.quantityToggled])
    const { preOrder } = useSelector((state: any) => state.order);
    const [itemToDelete, setItemToDelete] = useState(preOrder)

    const dispatch = useDispatch()
    const handleDelete = () => {
        console.log('items 2', items.filter((x: any) => x.id === orderItem.id)[0].id)
        setItemToDelete((prevState: any) => prevState.filter((x: any) => x.id !== orderItem.id))
        setOrderItem((prevState: any) => prevState.filter((x: any) => x.id !== orderItem.id))
    }
    useEffect(() => {
        console.log("itemToDelete", itemToDelete)
        dispatch(deletePreOrder(itemToDelete))
    }, [itemToDelete, items])

    return (
        <div className='mx-auto my-2'><Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {orderItem.productName}
                    <div>unit price = {orderItem.sellingPrice}</div>
                </CardTitle>
                <Trash2 onClick={handleDelete} />
            </CardHeader>
            <CardContent>
                <div className="text-xl font-bold">Total {orderItem.total}</div>
                <div className="grid grid-cols-3 gap-2">
                    <Button className='' variant="secondary" onClick={() => handleAdd()}>+</Button>
                    <div>
                        <Input id="quantity" type="number" value={orderItem.quantityToggled} onChange={(e) => handleInputChange(orderItem.id, e.target.value)} />
                    </div>
                    <Button variant="secondary" onClick={() => handleMinus()}>-</Button>
                </div>
            </CardContent>
        </Card></div>
    )
}

export default OrderSectionItem