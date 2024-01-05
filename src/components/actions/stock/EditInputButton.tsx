import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateBuyingPrice, updateQuantity, updateSellingPrice } from "@/redux/stockSlice";
import { useState } from "react";
import { RxUpdate } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";


export default function EditInputButton({ type, value, id }) {
    const [inputValue, setInputValue] = useState(value)

    const notifySuccess = () =>
        toast.success("Update Successful", {
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
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    const dispatch = useDispatch()
    const handleClick = (e) => {
        e.preventDefault()

        if (type === "buyingPrice") {
            try {
                dispatch(updateBuyingPrice({ id: id, buyingPrice: value }))
                return notifySuccess()
            } catch (error) {
                notifyError()
            }
        }
        else if (type === "sellingPrice") {
            try {
                dispatch(updateSellingPrice({ id: id, sellingPrice: value }))
                return notifySuccess()
            } catch (error) {
                notifyError()
            }
        }
        else if (type === "quantity") {
            try {
                dispatch(updateQuantity({ id: id, quantity: value }))
                return notifySuccess()
            } catch (error) {
                notifyError()
            }
        }
    }
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <ToastContainer />
            <Input type="number" className="min-w-[6rem]" placeholder={value} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <Button variant="secondary" className="ml-[-10px]" onClick={handleClick}><RxUpdate /></Button>
        </div>
    )
}
