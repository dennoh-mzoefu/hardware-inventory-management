import { createSlice, current } from "@reduxjs/toolkit";
import { addDoc, updateDoc } from "firebase/firestore";
import { ordersColRef } from "../utils/firebase";

const initialState = {
  orders: [],
  preOrder: [],
};

export const stockSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchOrder: (state, action) => {
      return {
        ...state,
        orders: action.payload,
      };
    },
    deletePreOrder: (state, action) => {
      let a = state.preOrder;
      console.log(
        "from state",
        JSON.parse(JSON.stringify(a.filter((x) => x.id === action.payload)))
      );
      // state.preOrder = state.preOrder.filter((x) => x.id !== action.payload);
      return {
        ...state,
        preOrder: action.payload,
      };
    },
    deleteAllPreOrder: (state, action) => {
      return {
        ...state,
        preOrder: [],
      };
    },
    addCurrentOrder: (state, action) => {
      console.log("payload", action.payload);
      return {
        ...state,
        preOrder: [...state.preOrder, action.payload],
      };
    },
    addOrderItem: (state, action) => {
      addDoc(ordersColRef, {
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
  },
});

export const {
  fetchOrder,
  addOrderItem,
  addCurrentOrder,
  deletePreOrder,
  deleteAllPreOrder,
} = stockSlice.actions;
export default stockSlice.reducer;
