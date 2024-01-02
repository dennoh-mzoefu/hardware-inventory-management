import React, { useState, ChangeEvent } from 'react';
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
import { Stock } from './StockTable'
import { useDispatch } from 'react-redux';
import { addStockItem } from '@/redux/stockSlice';
import { stockColRef } from '@/utils/firebase';
import { onSnapshot, query, where } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function AddQuantity() {
    const notifySuccess = () =>
        toast.success("item Added", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    const notifyError = () =>
        toast.error("Item is in Database", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    interface FormState {
        productName: string,
        sizeOrCategory: string,
        quantity: number,
        buyingPrice: number,
        discount: number,
        location: string,
        sellingPrice: number,
        reorderPoint: number,
    }

    // Define state for the form inputs
    const [formState, setFormState] = useState<FormState>({
        productName: "",
        sizeOrCategory: "",
        quantity: 0,
        buyingPrice: 0,
        discount: 0,
        location: "",
        sellingPrice: 0,
        reorderPoint: 5,
    });
    // Handle input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };
    const dispatch = useDispatch()

    const checkValueExists = () => {


    }
    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Do something with the form data (formState)
        // checkValueExists()

        const q = query(stockColRef, where('productName', '==', formState.productName), where('sizeOrCategory', '==', formState.sizeOrCategory))

        // realtime collection data
        onSnapshot(q, (snapshot) => {
            let books = []
            snapshot.docs.forEach(doc => {
                books.push({ ...doc.data(), id: doc.id })
            })
            if (books.length !== 0) {
                notifyError()
                console.log("books error", books.length)

                return
            } else {
                formState.productName.trim().length !== 0 && formState.quantity !== 0 && dispatch(addStockItem({
                    ...formState
                }))
                formState.productName.trim().length !== 0 && formState.quantity !== 0 && notifySuccess()
                console.log("books success", books.length)
            }

        })

        setFormState({
            productName: "",
            sizeOrCategory: "",
            quantity: 0,
            buyingPrice: 0,
            discount: 0,
            location: "",
            sellingPrice: 0,
            reorderPoint: 5,
        })
        console.log(formState);
    };

    return (
        <div className="md:w-1/2 m-auto">
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <Card >
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Add Stock Item </CardTitle>
                        <CardDescription>
                            Input Respective Fields
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="text">Product name</Label>
                            <Input id="productName" type="text" placeholder="enter name" required value={formState.productName}
                                onChange={handleInputChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="text">Size or Category</Label>
                            <Input id="sizeOrCategory" type="text" placeholder="20 mm" value={formState.sizeOrCategory}
                                onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="number">Quantity</Label>
                                <Input id="quantity" type="number" required value={formState.quantity}
                                    onChange={handleInputChange} />
                            </div>
                            <div>
                                <Label htmlFor="number">Buying Price</Label>
                                <Input id="buyingPrice" type="number" value={formState.buyingPrice}
                                    onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="number">Discount</Label>
                                <Input id="discount" type="number" value={formState.discount}
                                    onChange={handleInputChange} />
                            </div>
                            <div>
                                <Label htmlFor="number">Selling Price</Label>
                                <Input id="sellingPrice" type="number" required value={formState.sellingPrice}
                                    onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="text">Location</Label>
                                <Input id="location" type="text" value={formState.location}
                                    onChange={handleInputChange} />
                            </div>
                            <div>
                                <Label htmlFor="number">Re order point</Label>
                                <Input id="reorderPoint" type="number" value={formState.reorderPoint}
                                    onChange={handleInputChange} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Add stock Item</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}

export default AddQuantity