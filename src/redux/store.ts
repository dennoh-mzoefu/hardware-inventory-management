import { configureStore } from "@reduxjs/toolkit";

// import menuReducer from "./menuSlice";
import salesReducer from "./SalesSlice";
import orderReducer from "./OrderSlice";
import stockReducer from "./stockSlice";
import expenseReducer from "./expenseSlice";

export const store = configureStore({
  reducer: {
    stock: stockReducer,
    order: orderReducer,
    sale: salesReducer,
    expense: expenseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
