import { createSlice, current } from "@reduxjs/toolkit";
import { addDoc, updateDoc } from "firebase/firestore";
import { salesColRef } from "../utils/firebase";

const initialState = {
  sales: [],
};

export const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    fetchSale: (state, action) => {
      return {
        ...state,
        sales: action.payload,
      };
    },
    addSaleItem: (state, action) => {
      const data = action.payload;
      console.log("sales", action.payload);
      addDoc(salesColRef, data).then((res) => {
        console.log(res);
      });
    },
  },
});

export const { fetchSale, addSaleItem } = saleSlice.actions;
export default saleSlice.reducer;
