import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../sagas";
import AuthReducer from "./auth/reducer";
import { useDispatch } from "react-redux";
import shopReducer from "./shop/reducer";
import orderReducer from "./order/order.slice";

const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
     reducer: {
          user: AuthReducer,
          shop: shopReducer,
          order: orderReducer
     },
     middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)


// get RootState and AppDispatch from store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()