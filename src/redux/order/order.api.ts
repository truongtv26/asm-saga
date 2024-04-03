import { createAsyncThunk } from '@reduxjs/toolkit'
import { IOrder } from '../../types/Type'

import { AxiosError, AxiosResponse } from 'axios'
import apiInstance from '../../api/api'

export const getOrders = createAsyncThunk('order/getOrders', async () => {
	try {
		const response: AxiosResponse<IOrder[]> = await apiInstance.get('orders')
		return response.data
	} catch (error) {
		throw error
	}
})

export const createOrder = createAsyncThunk('order/createOrder', async (order: Omit<IOrder, 'id'>, thunkAPI) => {
	try {
		const response: AxiosResponse<IOrder> = await apiInstance.post('/orders', order, {
			signal: thunkAPI.signal
		})

		return response.data
	} catch (error) {
		throw error
	}
})
