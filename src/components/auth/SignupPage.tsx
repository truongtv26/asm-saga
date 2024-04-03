import { signup } from '../../redux/auth/auth.api'
import { useAppDispatch } from '../../redux/store'
import AuthForm from './AuthForm'
import { IAuth } from './Type'
import { useCookies } from 'react-cookie'
import { jwtDecode } from 'jwt-decode'

const SignupPage = () => {
    const dispatch = useAppDispatch()
    const [ , setCookies] = useCookies(['user'])

    const handleSignup = (data: IAuth) => {
        dispatch(signup(data))
        .unwrap()
        .then((res) => {
            if (res?.accessToken) {
                const userDecode = jwtDecode(res.accessToken)
                if (userDecode.exp !== undefined) {
                    setCookies('user', res.accessToken, {
                        expires: new Date(userDecode.exp * 1000)
                    })
                }
            }
        })
        .catch((err) => {
            
        })
    }
    return <AuthForm mode='signup' handle={handleSignup} />
}

export default SignupPage
