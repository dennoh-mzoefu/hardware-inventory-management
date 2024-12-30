
import { Sidebar } from "@/components/Sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Route, Routes } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import Sales from "./pages/Sales";
import Stock from "./pages/Stock";
import Expense from "./pages/Expense";
import AddQuantity from "./components/stock/AddQuantity";
import EditStock from "./components/stock/EditStock";
import AddExpenseCategory from "./components/expense/AddExpenseCategory";
import SalesReport from "./Reports/SalesReport";
import Navbar from "./components/Navbar";
import { Separator } from "./components/ui/separator";
import DashboardPage from "./pages/DashboardPage";
import QuantityRestocking from "./QuickActions/QuantityRestocking";

export const metadata = {
    title: "Music App",
    description: "Example music app using the components.",
}

export default function PostApp() {
    return (
        <>
            <div className="border-t">
                <div className="bg-background">
                    <div className="flex w-[100%]">
                        <Sidebar className="hidden md:block md:max-w-[15vw]" />
                        <div className="lg:border-l h-[100vh] w-full">
                            <Navbar />
                            <Separator />
                            <ScrollArea className="h-[100vh] w-full">
                                <div className="h-full mx-2 py-6 lg:px-8 min-h-[100vh]">
                                    <Routes>
                                        <Route path="/dashboard" element={<DashboardPage />} />
                                        <Route path="/" element={<MenuPage />} />
                                        <Route path="sales" element={<Sales />} />
                                        <Route path="/stock" element={<Stock />} />
                                        <Route path="/stock/add" element={<AddQuantity />} />
                                        {/* <Route path="/stock/edit/:stockId" element={<EditStock />} /> */}
                                        <Route path="expense" element={<Expense />} />
                                        <Route path="expense/add/new" element={<AddExpenseCategory />} />

                                        {/* quick actions */}
                                        <Route path="actions/stock/" element={<QuantityRestocking />} />

                                        {/* reports */}
                                        <Route path="report/sales" element={<SalesReport />} />

                                    </Routes>
                                </div>
                            </ScrollArea>
                        </div>

                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}
