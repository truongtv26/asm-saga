import { useDispatch } from 'react-redux'
import './App.css'
import Routers from './routers'
import { getUserFailure, getUserRequest, getUserSuccess } from './redux/auth'
import { getUserToken } from './api/authApi'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

function App() {
    const [cookies] = useCookies()
    const dispatch = useDispatch()

    useEffect(() => {
        if (cookies.user) {
            dispatch(getUserRequest())
            getUserToken(cookies.user)
                .then((res) => {
                    if (res?.status === 200) {
                        dispatch(getUserSuccess(res.data))
                    } else {
                        dispatch(getUserFailure())
                    }
                })
                .catch((err) => {
                    console.log(err)
                    dispatch(getUserFailure())
                })
        }
    }, [])

    return <Routers />
}

export default App
