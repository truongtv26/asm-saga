import './App.css'
import Routers from './routers'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useAppDispatch } from './redux/store'
import { getUser } from './redux/auth/auth.api'

function App() {
    const [cookies] = useCookies()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (cookies.user) {
            dispatch(getUser(cookies.user))
        }
    }, [dispatch])

    return <Routers />
}

export default App
