import { createSlice, current } from "@reduxjs/toolkit";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import { db, stockColRef } from "../utils/firebase";

const initialState = {
  stock: [],
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    fetchStock: (state, action) => {
      return {
        ...state,
        stock: action.payload,
      };
    },
    addStockItem: (state, action) => {
      console.log("lkfjlkjdfl", action.payload);
      addDoc(stockColRef, {
        productName: action.payload.productName,
        sizeOrCategory: action.payload.sizeOrCategory,
        quantity: action.payload.quantity,
        buyingPrice: action.payload.buyingPrice,
        discount: action.payload.discount,
        location: action.payload.location,
        sellingPrice: action.payload.sellingPrice,
        reorderPoint: action.payload.reorderPoint,
        dateAdded: new Date(),
        lastRestocked: new Date(),
      }).then((res) => {
        console.log(res);
      });
    },
    updateStockSale: (state, action) => {
      const doneDocRef = doc(db, "stock", action.payload.id);
      updateDoc(doneDocRef, {
        quantity: action.payload.quantity,
      }).then(() => {});
    },

    updateBuyingPrice: (state, action) => {
      const addRef = doc(db, "stock", action.payload.id);
      updateDoc(addRef, {
        quantity: action.payload.buyingPrice,
      }).then(() => {});
    },
    updateSellingPrice: (state, action) => {
      const addRef = doc(db, "stock", action.payload.id);
      updateDoc(addRef, {
        quantity: action.payload.sellingPrice,
      }).then(() => {});
    },
    updateQuantity: (state, action) => {
      const addRef = doc(db, "stock", action.payload.id);
      updateDoc(addRef, {
        quantity: action.payload.quantity,
      }).then(() => {});
    },
  },
});

export const {
  fetchStock,
  addStockItem,
  updateStockSale,
  updateBuyingPrice,
  updateSellingPrice,
  updateQuantity,
} = stockSlice.actions;
export default stockSlice.reducer;
