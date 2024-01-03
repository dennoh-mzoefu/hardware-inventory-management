import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addSaleItem } from "@/redux/SalesSlice";
import { updateStockSale } from "@/redux/stockSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { deleteAllPreOrder } from "@/redux/OrderSlice";

export function ReceiptDialog({ orderItem, balance, paid, totalItems, setOrderItem, totalProfit }) {

    const notifySuccess = () =>
        toast.success("sale recorded", {
            position: "top-right",
            autoClose: 1000,
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

    const dispatch = useDispatch()

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "stock",
        onAfterPrint: () => alert("Print Success"),
    });

    const handleCheckout = () => {

        try {
            handlePrint()
            dispatch(addSaleItem({
                soldItems: orderItem,
                paid: paid,
                balance: balance,
                totalItems: totalItems,
                totalProfit: totalProfit,
                createdAt: new Date()
            }))

            orderItem.map((item) => dispatch(updateStockSale(
                {
                    id: item.id,
                    quantity: item.quantity - item.quantityToggled,
                }
            )))
        } catch (error) {
            notifyError()
            return
        }
        notifySuccess()
        dispatch(deleteAllPreOrder)
        setOrderItem([])

        // updating Stock
    }
    return (
        <Dialog>
            <ToastContainer />
            <DialogTrigger asChild>
                <Button className="mt-1" disabled={orderItem.length === 0 || parseInt(balance) < 0 ? true : false} variant="default">Checkout</Button>
            </DialogTrigger>
            <DialogContent className="px-3">
                <div ref={componentRef}>
                    <DialogHeader>
                        <DialogTitle className="my-3">
                            <p className="text-md font-bold">Hardware Shop</p>
                            <p className="text-primary font-medium my-2">Receipt</p>
                        </DialogTitle>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-fit">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                            Product name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Quantity
                                        </th>
                                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                            Unit Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItem?.map((item, index) => (

                                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                {item.productName}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.quantityToggled}
                                            </td>
                                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                {item.sellingPrice}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.total}
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>


                    </DialogHeader>
                    <div className="flex items-center space-x-2 mt-2">
                        <div className="grid grid-cols-3 flex-1 gap-2 text-center">
                            <div className="grid flex-1 border-b ">
                                <h2 className="text-xl font-bold">Total</h2>
                                <p>{totalItems}</p>
                            </div>
                            <div className="grid flex-1mx-3 border-b">
                                <h2 className="text-xl font-bold">Balance</h2>
                                <p>{balance}</p>
                            </div>
                            <div className="grid flex-1mx-3 border-b">
                                <h2 className="text-xl font-bold">Paid</h2>
                                <p>{paid}</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-center mb-1">Thank you for shopping with us</p>
                </div>
                <DialogFooter className="sm:justify-between mt-3">
                    <Button type="button" variant="default" onClick={handleCheckout}>
                        Checkout
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
