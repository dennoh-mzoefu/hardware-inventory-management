import { createSlice, current } from "@reduxjs/toolkit";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { db, expenseColRef } from "../utils/firebase";

const initialState = {
  expense: [],
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    fetchExpense: (state, action) => {
      return {
        ...state,
        expense: action.payload,
      };
    },
    addExpenseItem: (state, action) => {
      console.log("lkfjlkjdfl", action.payload);
      //   const data = action.payload

      addDoc(expenseColRef, action.payload).then((res) => {
        console.log(res);
      });
    },
    updateExpense: (state, action) => {
      const doneDocRef = doc(db, "expense", action.payload.id);
      updateDoc(doneDocRef, {
        //amount,date,description object added to expenseDetails array
        expenseName: action.payload.expenseName,
        amount: action.payload.amount,
        date: action.payload.date,
      }).then(() => {});
    },

    // addQuantity: (state, action) => {
    //   const addRef = doc(db, "expense", action.payload.id);
    //   updateDoc(addRef, {
    //     quantity: action.payload.quantity,
    //   }).then(() => {});
    // },
  },
});

export const { fetchExpense, addExpenseItem, updateExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
