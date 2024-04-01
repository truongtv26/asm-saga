import { useDispatch } from 'react-redux'
import AuthForm from './AuthForm'
import { IAuth } from './Type'
import { signin, signinFailure, signinRequest, signinSuccess } from '.'
import { IUser } from '../../types/Type'
import { useCookies } from 'react-cookie'
import { jwtDecode } from 'jwt-decode'

const SigninPage = () => {
    const dispatch = useDispatch()
    const [ , setCookie] = useCookies(['user']);

    const handleSignin = (data: IAuth) => {
        dispatch(signinRequest())
        signin(data)
        .then((res) => {
            
            if (res?.accessToken) {
                const userDecode = jwtDecode(res.accessToken)

                if (userDecode.exp !== undefined) {
                    setCookie('user', res.accessToken, {
                        expires: new Date(userDecode.exp * 1000) 
                    })
                }
                dispatch(signinSuccess(res.user as IUser))
            } else {
                dispatch(signinFailure("Signin failed"))
            }
        })
        .catch((err) => {
            dispatch(signinFailure(err.response.data))
        })
    }

    return <AuthForm mode='signin' handle={handleSignin} />
}

export default SigninPage
