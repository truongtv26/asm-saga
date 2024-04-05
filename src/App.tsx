import './App.css'
import Routers from './routers'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useAppDispatch } from './redux/store'
import { getUser } from './redux/auth/auth.api'
import { useLocalStorage } from './hooks/useLocalStorage'
import { updateToCart } from './redux/auth/auth.slice'

function App() {
    const [cookies] = useCookies()
    const [cart] = useLocalStorage("cart", [])
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (cookies.user) {
            dispatch(getUser(cookies.user))
            dispatch(updateToCart(cart))
        }
    }, [dispatch])

    return <Routers />
}

export default App
