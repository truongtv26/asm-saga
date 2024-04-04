import { useState } from 'react'
import { IAuth } from './Type'
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Input, Form } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

type AuthFormProps = {
	mode: 'signin' | 'signup'
	handle: (data: IAuth) => void
}

const initialState: IAuth = {
	email: '',
	password: '',
	fullname: '',
	phone: '',
	isRemembered: false
}

const AuthForm = ({ mode, handle }: AuthFormProps) => {
	const userStore = useSelector((state: RootState) => state.user)

	const [formData, setFormData] = useState<IAuth>(initialState)

	const onFormChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[target.name]: target.value
		})
	}

	const formValidator = {
		email: (_: any, value: string) => {
			if (formData.email.length <= 0) {
				return Promise.reject('Please enter a valid email!')
			}
			const emailRegex =
				/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
			if (!emailRegex.test(value)) {
				return Promise.reject('Email is not valid!')
			}
			return Promise.resolve()
		}
	}

	const onFinish = () => handle(formData)

	const onFinishFailed = () => {}

	return (
		<div className='w-full min-h-[100vh] bg-[url("/assets/images/banner1.jpg")] bg-no-repeat bg-cover'>
			<Form
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				name='normal_login'
				className='min-w-[40%] bg-secondary p-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded shadow-auth-form'
			>
				<h2 className='text-center text-primary text-[24px] font-mono italic pb-8'>
					{mode === 'signin' ? 'SIGN IN' : 'SIGN UP'}
					{userStore.error ? <p className='text-center text-red-600'>{userStore.error}</p> : ''}
				</h2>

				<Form.Item
					name='email'
					rules={[
						{
							validator: formValidator.email
						}
					]}
				>
					<Input
						prefix={<MailOutlined className='site-form-item-icon' />}
						placeholder='Email'
						name='email'
						onChange={onFormChange}
					/>
				</Form.Item>
				<Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
					<Input
						prefix={<LockOutlined className='site-form-item-icon' />}
						type='password'
						name='password'
						onChange={onFormChange}
						placeholder='Password'
					/>
				</Form.Item>
				{mode === 'signin' && (
					<Form.Item>
						<Form.Item name='remember' valuePropName='checked' noStyle>
							<Checkbox
								onChange={({ target }) => {
									setFormData({ ...formData, isRemembered: target.checked })
								}}
							>
								Remember me
							</Checkbox>
						</Form.Item>
						<Link to={'/forgot-password'} className='text-blue-600 float-right'>
							Forgot password
						</Link>
					</Form.Item>
				)}

				{mode === 'signup' && (
					<>
						<Form.Item name='fullname' rules={[{ required: true, message: 'Please input your Fullname!' }]}>
							<Input
								prefix={<UserOutlined className='site-form-item-icon' />}
								placeholder='Fullname'
								name='fullname'
								onChange={onFormChange}
							/>
						</Form.Item>
						<Form.Item name='phone'>
							<Input
								prefix={<PhoneOutlined className='site-form-item-icon' />}
								placeholder='Phone'
								name='phone'
								onChange={onFormChange}
							/>
						</Form.Item>
					</>
				)}
				<Form.Item className='flex flex-col justify-center items-center'>
					{userStore.isLoading ? (
						<Button>Waiting...</Button>
					) : (
						<Button type='primary' htmlType='submit' className='w-full'>
							<p className='text-white w-full'>{mode === 'signin' ? 'Signin' : 'Signup'}</p>
						</Button>
					)}

					<p>
						Or{' '}
						{mode === 'signin' ? (
							<Link to={'/signup'}>Signup here</Link>
						) : (
							<Link to={'/signin'}>Signin here</Link>
						)}
					</p>
				</Form.Item>
			</Form>
		</div>
	)
}

export default AuthForm
