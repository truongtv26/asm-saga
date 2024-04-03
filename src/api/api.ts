import axios, { AxiosResponse } from 'axios'

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

axios.interceptors.request.use(
    function (config) {
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    function (response: AxiosResponse) {
        return response.data
    },
    function (error) {
        return Promise.reject(error)
    }
)

export default apiInstance;