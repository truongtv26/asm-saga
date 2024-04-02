import { createReducer } from "@reduxjs/toolkit";
import { filterProducts, getProductFailure, getProductRequest, getProductSuccess, getProductsFailure, getProductsRequest, getProductsSuccess } from "./actions";
import { IProduct } from "../../types/Type";

export type FilterType = {
     name?: string
     category?: string
}

export type ShopState = {
     productList: IProduct[] | null
     product: IProduct | null
     isLoading: boolean
     error: string | null
     filter: FilterType
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
     .addCase(getProductRequest, (state) => {
          return { ...state, isLoading: true }
     })
     .addCase(getProductSuccess, (state, action) => {
          return { ...state, product: action.payload, isLoading: false }
     })
     .addCase(getProductFailure, (state, action) => {
          return { ...state, error: action.payload, isLoading: false }
     })
     .addCase(filterProducts, (state, action) => {
          return { ...state, filter: action.payload } 
     })
})

export default shopReducer