import React, { useState, ChangeEvent, useEffect } from 'react';
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
import { Expense } from './ExpenseTable'
import { useDispatch } from 'react-redux';
import { addExpenseItem } from '@/redux/expenseSlice';
import BadgePopOver from './BadgePopOver';
import { Textarea } from "@/components/ui/textarea"

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// import { addExpenseItem } from '@/redux/expenseSlice';



function AddExpenseCategory() {

    interface FormState {
        expenseName: string,
        amount: number,
        description: string,
    }

    // Define state for the form inputs
    const [formState, setFormState] = useState<FormState>({
        expenseName: "",
        amount: 0,
        description: "",
    });
    // Handle input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };
    const [value, setValue] = useState("");

    function handleChange(e) {
        // do something with the input value
        // console.log(e.target.value);
        // update the state
        setValue(e.target.value);
    }
    useEffect(() => {
        setFormState((prevState) => ({
            ...prevState,
            description: value,
        }));
        console.log(formState.description)
    }, [value])

    const handleTextArea = (value) => {
        // const { value } = e.target
        setFormState((prevState) => ({
            ...prevState,
            description: value,
        }));
    }
    const dispatch = useDispatch()

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formState.expenseName.trim().length === 0 && formState.amount === 0) return
        // Do something with the form data (formState)
        try {
            formState.expenseName.trim().length !== 0 && formState.amount !== 0 && dispatch(addExpenseItem({
                ...formState, dateAdded: new Date()
            }))
        } catch (e) {
            notifyError()
            return
        }
        notifySuccess()
        setFormState(
            {
                expenseName: "",
                amount: 0,
                description: "",
            }
        )
    };

    const clickButtonById = (buttonId) => {
        const buttonElement = document.getElementById(buttonId);
        if (buttonElement) {
            console.log({ buttonId })
            buttonElement.click();
        }
    };

    // Use useEffect to simulate the click after the component is mounted
    useEffect(() => {
        console.log("mdmdmdm", formState.expenseName)

        clickButtonById('expenseBadgePopover'); // Replace 'expenseBadgePopover' with the actual ID
    }, [formState.expenseName]);

    const notifySuccess = () =>
        toast.success("Expense Added", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    const notifyError = () =>
        toast.error("Error Occured", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    return (
        <div className="md:w-1/2 m-auto">
            <ToastContainer />

            <form onSubmit={handleSubmit}>
                <Card >
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Add Expense Item </CardTitle>
                        <CardDescription>
                            Input Respective Fields
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="text">Expense name</Label>
                            <div className="flex w-full max-w-sm items-center space-x-2">
                                <Input type="text" placeholder="expense name" value={formState.expenseName} disabled required={true} />
                                <BadgePopOver setFormState={setFormState} />

                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="number">Amount</Label>
                            <Input id="amount" required={true} type="number" placeholder="50 Ksh" value={formState.amount}
                                onChange={handleInputChange} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Enter Description</Label>
                            <Textarea value={value} onChange={handleChange} placeholder="Running cost" id="description" />
                            {/* <Textarea placeholder="Running cost" id="description" onChange={(e) => handleTextArea(e.target.value)} value={formState.decription} /> */}
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Add expense Item</Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}

export default AddExpenseCategory