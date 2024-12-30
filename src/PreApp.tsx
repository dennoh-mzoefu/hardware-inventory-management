import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fetchStock } from "./redux/stockSlice";
import { useDispatch } from "react-redux";
import { expenseColRef, salesColRef, stockColRef } from "./utils/firebase";
import { fetchSale } from "./redux/SalesSlice";
import { fetchExpense } from "./redux/expenseSlice";

function PreApp() {

    const dispatch = useDispatch();

    const [stock, setStock] = useState<any>([]);
    const [sale, setSale] = useState<any>([]);
    const [expense, setExpense] = useState<any>([]);

    useEffect(() => {
        const unSubscribe = onSnapshot(expenseColRef, (snapshot) => {
            setExpense(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return () => unSubscribe();
    }, []);
    useEffect(() => {
        const unSubscribe = onSnapshot(stockColRef, (snapshot) => {
            setStock(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return () => unSubscribe();
    }, []);
    useEffect(() => {
        const unSubscribe = onSnapshot(salesColRef, (snapshot) => {
            setSale(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return () => unSubscribe();
    }, []);

    useEffect(() => {
        console.log({ expense });
        dispatch(fetchExpense(expense));
    }, [expense]);
    useEffect(() => {
        console.log({ sale });
        dispatch(fetchSale(sale));
    }, [sale]);
    useEffect(() => {
        console.log({ stock });
        dispatch(fetchStock(stock));
    }, [stock]);
    return (
        <div className="">
        </div>
    )
}

export default PreApp