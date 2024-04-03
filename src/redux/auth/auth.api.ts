import { jwtDecode } from 'jwt-decode';
import { AxiosResponse } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IAuth } from '../../components/auth/Type'
import apiInstance from '../../api/api'
import { IUser } from '../../types/Type';

type AuthResponseType = {
	accessToken: string
	user: IAuth
}

export const signin = createAsyncThunk('auth/signin', async (data: IAuth, thunkAPI) => {
	try {
		const response: AxiosResponse<AuthResponseType> = await apiInstance.post('/signin', data, {
			signal: thunkAPI.signal
		})
		return response.data
	} catch (error: any) {
		throw thunkAPI.rejectWithValue(error.response.data)
	}
})

export const signup = createAsyncThunk('auth/signup', async (data: IAuth, thunkAPI) => {
	try {
		const response: AxiosResponse<AuthResponseType> = await apiInstance.post('signup', data)

		return response.data
	} catch (error: any) {
		throw thunkAPI.rejectWithValue(error.response.data)
	}
})

export const getUser = createAsyncThunk('auth/getUser', async (token: string) => {
	try {
		const user = jwtDecode(token)
		const response = await apiInstance.get<IUser>(`users/${user.sub}`)
          return response.data
	} catch (error) {
		throw error
	}
})
