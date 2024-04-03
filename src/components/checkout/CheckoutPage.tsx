import { Form, Input, type FormProps, Button, Row, Col } from 'antd'
import { useLocation } from 'react-router-dom'
import { CartDataType } from '../cart/CartPage'
import { vietnameseCurrency } from '../../helpers/currency'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../redux/store'
import { createOrder } from '../../redux/order/order.api'
import { IOrder, IProduct } from '../../types/Type'
import { toast } from 'react-toastify'

type FieldType = {
	fullname: string
	email: string
	phone_number: string
	address: string
}
interface InitialBillingInfo extends Omit<IOrder, "id"> {
    email: string;
    phone_number: string;
    address: string;
    fullname: string;
    details: IProduct[]
}

const initialBillingInfo: InitialBillingInfo = {
    email: "",
    phone_number: "",
    address: "",
    fullname: "",
    details: []
};

const CheckoutPage = () => {
	const order = useSelector((state: RootState) => state.order)
	const dispatch = useAppDispatch()
	const location = useLocation()
	const [form] = Form.useForm()
	const { cartItemSelected } = location.state || []

	const [billingInfo, setBillingInfo] = useState(initialBillingInfo)

	const onChangeBillingInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.target
		setBillingInfo({
			...billingInfo,
			[target.name]: target.value
		})
	}

	const onFinish: FormProps<FieldType>['onFinish'] = () => {
          const data = {
               ...billingInfo,
               details: cartItemSelected,
          }
		dispatch(createOrder(data))
		.unwrap()
		.then(() => {
			toast.success("Created Order")
		})
		.catch((error) => {
			toast.error(error.message)
		})
     }
	
	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {}

	return (
		<div>
			<h2 className='text-3xl italic my-10'>Checkout</h2>
			<Form
				form={form}
				layout='vertical'
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
			>
				<Row>
					<Col span={18}>
						<h2 className='text-xl italic '>Billing Details</h2>
						<Form.Item<FieldType>
							label='Full Name'
							name='fullname'
							rules={[{ required: true, message: 'Please input your full name' }]}
							wrapperCol={{ lg: 22 }}
							style={{ width: '100%', marginRight: 0 }}
							initialValue={billingInfo.fullname}
						>
							<Input
								className='py-2'
								placeholder='enter fullname'
								name='fullname'
								onChange={onChangeBillingInfo}
							/>
						</Form.Item>

						<Form.Item<FieldType>
							label='Email'
							name='email'
							rules={[
								{ required: true, message: 'Please input your email' },
								{
									type: 'email',
									message: 'Invalid Email'
								}
							]}
							wrapperCol={{ lg: 22 }}
							style={{ width: '100%', marginRight: 0 }}
							initialValue={billingInfo.email}
						>
							<Input
								className='py-2'
								placeholder='enter email'
								name='email'
								onChange={onChangeBillingInfo}
							/>
						</Form.Item>
						<Form.Item<FieldType>
							label='Phone Number'
							name='phone_number'
							rules={[
								{ required: true, message: 'Please input your phone number' },
								{
									validator: (_, value) => {
										if (value && value.length > 0) {
											const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
											if (regexPhoneNumber.test(value)) {
												return Promise.resolve()
											}
											return Promise.reject('Invalid phone number')
										}
										return Promise.reject()
									}
								}
							]}
							wrapperCol={{ lg: 22 }}
							style={{ width: '100%', marginRight: 0 }}
							initialValue={billingInfo.phone_number}
						>
							<Input
								className='py-2'
								placeholder='enter phone number'
								name='phone_number'
								onChange={onChangeBillingInfo}
							/>
						</Form.Item>
						<Form.Item<FieldType>
							label='Address'
							name='address'
							rules={[{ required: true, message: 'Please input your address' }]}
							wrapperCol={{ lg: 22 }}
							style={{ width: '100%', marginRight: 0 }}
							initialValue={billingInfo.address}
						>
							<Input
								className='py-2'
								placeholder='enter address'
								name='address'
								onChange={onChangeBillingInfo}
							/>
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type='primary' htmlType='submit' disabled={order.isLoading ? true : false}>
								{order.isLoading ? "Checking..." : "Submit"}
							</Button>
						</Form.Item>
					</Col>
					<Col span={6}>
						<h2 className='text-xl italic mb-2'>Your Orders</h2>
						<hr />
						{cartItemSelected.map((item: CartDataType) => (
							<div key={item.key}>
								<div className='flex flex-col py-3'>
									<p className='text-black font-bold'>{item.product}</p>
									<div>
										<span className='text-gray-500 italic pr-3'>SL: {item.quantity}</span>
										<span className='text-gray-500 italic pr-3'>
											Price: {vietnameseCurrency(item.price)}
										</span>
									</div>
								</div>
								<hr />
							</div>
						))}
						<div>
							<p className='flex justify-between'>
								<span className='text-xl text-gray-600 italic'>Total:</span>
								<span className='text-xl text-gray-600 italic'>
									{vietnameseCurrency(
										cartItemSelected.reduce((total: number, item: CartDataType) => {
											return total + item.quantity * item.price
										}, 0)
									)}
								</span>
							</p>
						</div>
					</Col>
				</Row>
			</Form>
		</div>
	)
}

export default CheckoutPage
