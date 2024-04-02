import { Button, Table } from 'antd'
import type { TableColumnsType } from 'antd'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { IProduct } from '../../types/Type'
import { DeleteOutlined } from '@ant-design/icons'
import { vietnameseCurrency } from '../../helpers/currency'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export interface CartDataType {
	key: React.Key
	image: string
	product: string
	price: number
	quantity: number
	total: number
	action: string
}

const CartPage = () => {
	const [cart, setCart] = useLocalStorage('cart')
	const navigate = useNavigate()
	const [cartItemSelected, setCartItemSelected] = useState<CartDataType[]>()

	const columns: TableColumnsType<CartDataType> = [
		{
			title: 'Image',
			dataIndex: 'image',
			render: (img: string) => <img src={img} width={50} height={40} />
		},
		{
			title: 'Product',
			dataIndex: 'product'
		},
		{
			title: 'Price',
			dataIndex: 'price',
			render: (value: number) => vietnameseCurrency(value)
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity'
		},
		{
			title: 'Total',
			dataIndex: 'total',
			render: (value: number) => vietnameseCurrency(value)
		},
		{
			title: 'Remove',
			dataIndex: 'action',
			render: (product_id: string) => (
				<DeleteOutlined
					color='#d91b02'
					onClick={() => {
						const newCartData = cart.filter((product: IProduct) => product._id.$oid !== product_id)
						setCart(newCartData)
					}}
				/>
			)
		}
	]

	const data: CartDataType[] = cart.map((product: IProduct) => {
		return {
			key: product._id.$oid,
			image: product.img1,
			product: product.name,
			price: product.price,
			quantity: product.quantity,
			total: product.price * (product.quantity ?? 1),
			action: product._id.$oid,
			original: product,
		}
	})

	// rowSelection object indicates the need for row selection
	const rowSelection = {
		onChange: (selectedRowKeys: React.Key[], selectedRows: CartDataType[]) => {
			setCartItemSelected(selectedRows)
		}
	}

	const handleCheckout = () => {
		
		navigate('/checkout',{
			state:{
				cartItemSelected
			}
		});
	}

	return (
		<div>
			<Table
				rowSelection={{
					type: 'checkbox',
					...rowSelection
				}}
				columns={columns}
				dataSource={data}
				pagination={{
					pageSize: 5
				}}
			/>
			<Button
				className='mb-5'
				type='primary'
				disabled={cartItemSelected && cartItemSelected?.length > 0 ? false : true}
				onClick={cartItemSelected && cartItemSelected?.length > 0 ? handleCheckout : () => {}}
			>
				<span className='text-white'>Checkout</span>
			</Button>
		</div>
	)
}

export default CartPage
