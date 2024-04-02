import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProducts } from '.'
import { RootState } from '../../redux/store'
import { getProductFailure, getProductRequest, getProductSuccess, getProductsSuccess } from '../../redux/shop/actions'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Button, Col, InputNumber, Row } from 'antd'
import ProductList from './ProductList'
import { vietnameseCurrency } from '../../helpers/currency'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { Controller, FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { IProduct } from '../../types/Type'
import { toast } from 'react-toastify'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const ProductDetail = () => {
	const { id } = useParams()
	const [cart, setCart] = useLocalStorage('cart')

	const [productSelected, setProductSelected] = useState<IProduct>()
	const [swiper, setSwiper] = useState(null)
	const [thumbsSwiper, setThumbsSwiper] = useState(null)

	const [productImages, setProductImages] = useState<Array<any>>([])

	const { product, productList, isLoading } = useSelector((state: RootState) => state.shop)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getProductRequest())
		getProducts()
			.then((data) => {
				if (data) {
					dispatch(getProductsSuccess(data))
					const product = data.find((product) => product._id.$oid === id)
					if (product) {
						dispatch(getProductSuccess(product))
						setProductSelected(product)
						const imgs = [product.img1, product.img2, product.img3, product.img4]
						setProductImages(imgs)
					} else {
						dispatch(getProductFailure('Product not found'))
					}
				}
			})
			.catch(() => {
				dispatch(getProductFailure('Product not found'))
			})
	}, [dispatch])

	const slides: Array<any> = []
	const thumbs: Array<any> = []
	productImages.forEach((img, index) => {
		slides.push(
			<SwiperSlide key={index} tag='li'>
				<img
					src={img}
					key={index}
					className='bg-contain'
					style={{ listStyle: 'none' }}
					alt={`Slide ${index}`}
				/>
			</SwiperSlide>
		)

		thumbs.push(
			<SwiperSlide key={index} tag='li' style={{ listStyle: 'none' }}>
				<img key={index} src={img} alt={`Thumbnail ${index}`}></img>
			</SwiperSlide>
		)
	})

	const handleAddToCart = () => {
		if (!productSelected?.quantity) {
			toast.error('Please select a quantity')
		} else {
			if (cart.some((item: any) => item.product_id.$oid === productSelected._id.$oid)) {
				toast.error('Product already exists')
			} else {
				setCart([
					...cart,
					{
						product_id: productSelected._id,
						quantity: productSelected.quantity
					}
				])
				toast.success('Product has been added to cart')
			}
		}
	}

	return !isLoading && product ? (
		<>
			<Row gutter={24}>
				<Col span={12}>
					<React.Fragment>
						<Swiper
							className='h-[400px]'
							id='main'
							thumbs={{ swiper: thumbsSwiper }}
							modules={[FreeMode, Navigation, Thumbs, Controller]}
							tag='section'
							wrapperTag='ul'
							navigation
							pagination
							spaceBetween={0}
							slidesPerView={1}
						>
							{slides}
						</Swiper>

						<Swiper id='thumbs' spaceBetween={5} slidesPerView={3} modules={[Thumbs]} watchSlidesProgress>
							{thumbs}
						</Swiper>
					</React.Fragment>
				</Col>
				<Col span={12}>
					<h2 className='text-gray-800 italic text-3xl py-5'>{product.name}</h2>
					<p className='text-gray-400 italic text-xl py-5'>{vietnameseCurrency(product.price)}</p>
					<p className='text-gray-400 italic text-sm py-5'>{product.short_desc}</p>
					<p className='italic mb-3'>
						<span className='text-gray-700 font-bold'>CATEGORY:</span> {product.category}
					</p>
					<div className='flex'>
						<InputNumber
							className='w-[200px]'
							min={1}
							max={10}
							defaultValue={0}
							onChange={(value: any) => {
								productSelected && setProductSelected({ ...productSelected, quantity: Number(value) })
							}}
						/>
						<Button className='bg-gray-700 '>
							<span onClick={handleAddToCart} className='text-white hover:text-black'>
								Add to card
							</span>
						</Button>
					</div>
				</Col>
			</Row>
			<div className='mb-3'>
				<h2 className='uppercase text-[22px] italic'>product description</h2>
				<p>
					{product.long_desc.split('\n').map((item, index) => (
						<span key={index}>
							{item} <br />
						</span>
					))}
				</p>
			</div>
			<div className='mb-3'>
				<h2 className='uppercase text-[22px] italic'>related products</h2>
				{productList && product && (
					<ProductList data={productList.filter((p) => p.category === product.category)} />
				)}
			</div>
		</>
	) : (
		<Skeleton height={600} width={'100%'} />
	)
}

export default ProductDetail
