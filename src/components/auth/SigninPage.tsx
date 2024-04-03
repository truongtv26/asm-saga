import AuthForm from './AuthForm'
import { IAuth } from './Type'
import { useCookies } from 'react-cookie'
import { jwtDecode } from 'jwt-decode'
import { signin } from '../../redux/auth/auth.api'
import { useAppDispatch } from '../../redux/store'

const SigninPage = () => {
	const [, setCookie] = useCookies(['user'])
	const dispatch = useAppDispatch()

	const handleSignin = (data: IAuth) => {
		dispatch(signin(data))
			.unwrap()
			.then((res) => {
				if (res?.accessToken) {
					const userDecode = jwtDecode(res.accessToken)
					if (userDecode.exp !== undefined) {
						setCookie('user', res.accessToken, {
							expires: new Date(userDecode.exp * 1000)
						})
					}
				}
			})
			.catch((err) => {
                
			})
	}

	return <AuthForm mode='signin' handle={handleSignin} />
}

export default SigninPage
