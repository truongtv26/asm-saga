import { AxiosResponse } from 'axios';
import { IAuth } from './../components/auth/Type'
import { jwtDecode } from 'jwt-decode'
import apiInstance from './api'


export const signin = async (data: IAuth): Promise<any> => {
    try {
        const response = await apiInstance.post('signin', data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const signup = async (data: IAuth): Promise<any> => {
    try {
        const response = await apiInstance.post('signup', data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getUserToken = async (token: string): Promise<AxiosResponse<any>> => {
    try {
        const user = jwtDecode(token)
        return await apiInstance.get(`users/${user.sub}`)
    } catch (error) {
        throw error
    }
}

