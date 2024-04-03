import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import shopReducer from "./shop/reducer";
import orderReducer from "./order/order.slice";
import authReducer from "./auth/auth.slice";

export const store = configureStore({
     reducer: {
          user: authReducer,
          shop: shopReducer,
          order: orderReducer
     },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()