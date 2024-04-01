import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProducts } from '.'
import { RootState } from '../../redux/store'
import { getProductFailure, getProductRequest, getProductSuccess, getProductsSuccess } from '../../redux/shop/actions'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Col, Row } from 'antd'
import ProductList from './ProductList'


const ProductDetail = () => {
	const { id } = useParams()
	
	const {product, productList, isLoading} = useSelector((state: RootState) => state.shop)
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
					} else {
						dispatch(getProductFailure("Product not found"))
					}
                }
            })
            .catch(() => {
				dispatch(getProductFailure("Product not found"))
            })
    }, [dispatch])
	
	return (
		!isLoading ?
		<>
			<Row>
				<Col span={12}>
					col 1
				</Col>
				<Col span={12}>
					col 2
				</Col>
			</Row>

			<div className="mb-3">
				<h2 className='uppercase text-[22px] italic'>related products</h2>
				{productList && product && <ProductList data={productList.filter((p) => p.category === product.category)}/>}
			</div>
		</> :
		<Skeleton height={600} width={"100%"} />
	)
}

export default ProductDetail
