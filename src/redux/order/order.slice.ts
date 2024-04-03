import { IOrder } from './../../types/Type';
import { createSlice } from "@reduxjs/toolkit";
import { createOrder, getOrders } from './order.api';
import { FulfilledAction, PendingAction, RejectAction } from '../../types/asyncThunkType';

type OrderState = {
     orders: IOrder[],
     order: IOrder | null,
     isLoading: boolean
     error: any
}

const initialState: OrderState = {
     orders: [],
     order: null,
     isLoading: false,
     error: undefined
}

const orderSlice = createSlice({
     name: 'order',
     initialState,
     reducers: {
          
     },
     extraReducers(builder) {
          builder
          .addCase(createOrder.fulfilled, (state, action) => {
               return { ...state, order: action.payload }
          })
          .addCase(getOrders.fulfilled, (state, action) => {
               return { ...state, orders: action.payload }
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
                    return { ...state, error: undefined, isLoading: false }
               }
          )
          .addMatcher<RejectAction>(
               (action) => action.type.endsWith('rejected'),
               (state, action: any) => {
                    return { ...state, error: action.error.message, isLoading: false }
               }
          )
     }
})

export const { } = orderSlice.actions

const orderReducer = orderSlice.reducer

export default orderReducer