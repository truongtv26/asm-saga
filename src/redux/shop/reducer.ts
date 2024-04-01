import { createReducer } from "@reduxjs/toolkit";
import { getProductsFailure, getProductsRequest, getProductsSuccess } from "./actions";
import { IProduct } from "../../types/Type";

type ShopState = {
     productList: IProduct[] | null
     product: IProduct | null
     isLoading: boolean
     error: string | null
     filter: {}
     totalPages: number | null
     currentPage: number | null
}

const initialState: ShopState = {
     productList: null,
     product: null,
     isLoading: false,
     error: null,
     filter: {},
     totalPages: null,
     currentPage: 1
}

const shopReducer = createReducer(initialState, builder => {
     builder
     .addCase(getProductsRequest, (state) => {
          return { ...state, isLoading: true }
     })
     .addCase(getProductsSuccess, (state, action) => {
          return { ...state, productList: action.payload, isLoading: false}
     })
     .addCase(getProductsFailure, (state, action) => {
          return { ...state, error: action.payload, isLoading: false}
     })
})

export default shopReducer