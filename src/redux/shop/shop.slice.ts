import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types/Type";
import { getProducts } from "./shop.api";
import { FulfilledAction, PendingAction, RejectAction } from "../../types/asyncThunkType";

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

const shopSlice = createSlice({
     name: 'shop',
     initialState,
     reducers: {
          productFilter(state, action) {
               return { ...state, filter: action.payload }
          },
          setProducts(state, action) {
               return { ...state, productList: action.payload }
          },
          setProduct(state, action) {
               return { ...state, product: action.payload }
          }
     },
     extraReducers(builder) {
          builder
          .addCase(getProducts.fulfilled, (state, action) => {
               return { ...state, productList: action.payload }
          })
          .addMatcher<PendingAction>(
               (action) => action.type.endsWith('pending'),
               (state) => {
                    return { ...state, isLoading: true }
               }
          )
          .addMatcher<FulfilledAction>(
               (action) => action.type.endsWith('fulfilled'),
               (state) => {
                    return { ...state, isLoading: false }
               }
          )
          .addMatcher<RejectAction>(
               (action) => action.type.endsWith('rejected'),
               (state, action: any) => {
                    return { ...state, isLoading: false, error: action.payload }
               }
          )
     }
})

export const { productFilter, setProducts, setProduct } = shopSlice.actions

const shopReducer = shopSlice.reducer

export default shopReducer