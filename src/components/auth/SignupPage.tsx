import { useDispatch } from 'react-redux'
import AuthForm from './AuthForm'
import { IAuth } from './Type'
import { signup, signupFailure, signupRequest, signupSuccess } from '.'
import { jwtDecode } from 'jwt-decode'
import { useCookies } from 'react-cookie'
import { IUser } from '../../types/Type'

const SignupPage = () => {
    const [ , setCookies] = useCookies(['user'])
    const dispatch = useDispatch()

    const handleSignup = (data: IAuth) => {
        dispatch(signupRequest())
        signup(data)
        .then((res) => {
            if (res?.accessToken) {
                const userDecode = jwtDecode(res.accessToken)
                if (userDecode.exp !== undefined) {
                    setCookies("user", res.accessToken, {
                        expires: new Date(userDecode.exp * 1000)
                    })
                }
                dispatch(signupSuccess(res.user as IUser))
            } else {
                dispatch(signupFailure("Something is error"))
            }
        })
        .catch((err) => {
            dispatch(signupFailure(err.response.data))
        })
    }
    return <AuthForm mode='signup' handle={handleSignup} />
}

export default SignupPage
