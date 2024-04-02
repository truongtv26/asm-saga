import { Col, Row } from 'antd'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '../../redux/store'
import { getProducts, getProductsFailure, getProductsRequest, getProductsSuccess } from '.'
import ProductList from './ProductList'
import { IProduct } from '../../types/Type'
import { filterProducts } from '../../redux/shop/actions'
import type { SearchProps } from 'antd/es/input/Search'
import { FilterType } from '../../redux/shop/reducer'

const { Search } = Input

const ShopPage = () => {
    const shop = useSelector((state: RootState) => state.shop)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsRequest())
        getProducts()
            .then((data) => {
                if (data) {
                    // trường hợp có filter trong store
                    if (Object.keys(shop.filter).length > 0) {
                        let newData: IProduct[] = data
                        for (const [key, value] of Object.entries(shop.filter)) {
                            if (shop.filter.hasOwnProperty(key) && value !== '') {
                                newData = newData.filter((product) => {
                                    return key !== 'name'
                                        ? product[key as keyof IProduct] === shop.filter[key as keyof FilterType ]
                                        : product[key].toLowerCase().includes((shop.filter[key] ?? "").toLowerCase())
                                })
                            }
                        }

                        dispatch(getProductsSuccess(newData))
                    } else {
                        dispatch(getProductsSuccess(data))
                    }
                } else {
                    dispatch(getProductsFailure('get product list failed'))
                }
            })
            .catch((err) => {
                dispatch(getProductsFailure(err.response))
            })
    }, [dispatch, shop.filter])

    const handleSelectCategory = (value: string) => {
        if (value === 'all') {
            dispatch(filterProducts({}))
        } else {
            dispatch(filterProducts({ ...shop.filter, category: value }))
        }
    }

    const onSearch: SearchProps['onSearch'] = (value: string) => dispatch(filterProducts({ ...shop.filter, name: value }))

    return (
        <>
            <div className='mb-10 w-full h-[200px] bg-cover rounded shadow bg-no-repeat bg-[url("/assets/images/banner1.jpg")]'></div>
            <Row gutter={24} className='mb-10'>
                <Col span={4} style={{ padding: '0px!importan' }}>
                    <h2 className='text-black font-bold text-xl uppercase italic'>Categories</h2>
                    <div>
                        <h2 className='bg-black text-white text-2xl uppercase italic px-4'>Apple</h2>
                        <ul>
                            <li
                                className='italic px-4 text-gray-500 cursor-pointer py-1'
                                onClick={() => handleSelectCategory('all')}
                            >
                                All
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='text-black text-xl bg-primary uppercase italic px-4 my-4'>Iphone & mac</h2>
                        <ul>
                            <li
                                className='italic px-4 text-gray-500 cursor-pointer py-1'
                                onClick={() => handleSelectCategory('iphone')}
                            >
                                IPhone
                            </li>
                            <li
                                className='italic px-4 text-gray-500 cursor-pointer py-1'
                                onClick={() => handleSelectCategory('ipad')}
                            >
                                IPad
                            </li>
                            <li
                                className='italic px-4 text-gray-500 cursor-pointer py-1'
                                onClick={() => handleSelectCategory('macbook')}
                            >
                                MacBook
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='text-black text-xl bg-primary uppercase italic px-4 my-4'>Wireless</h2>
                        <ul>
                            <li
                                className='italic px-4 text-gray-500 cursor-pointer py-1'
                                onClick={() => handleSelectCategory('airpod')}
                            >
                                Airpod
                            </li>
                            <li
                                className='italic px-4 text-gray-500 cursor-pointer py-1'
                                onClick={() => handleSelectCategory('watch')}
                            >
                                Watch
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='text-black text-xl bg-primary uppercase italic px-4 my-4'>other</h2>
                        <ul>
                            <li
                                className='italic px-4 text-gray-500 cursor-pointer py-1'
                                onClick={() => handleSelectCategory('mouse')}
                            >
                                Mouse
                            </li>
                            <li
                                className='italic px-4 text-gray-500 cursor-pointer py-1'
                                onClick={() => handleSelectCategory('keyboard')}
                            >
                                Keyboard
                            </li>
                            <li
                                className='italic px-4 text-gray-500 cursor-pointer py-1'
                                onClick={() => handleSelectCategory('orther')}
                            >
                                Orther
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col span={20}>
                    <Row gutter={24} justify={'space-between'} className='mb-5'>
                        <Col span={12} className='flex gap-10 w-full'>
                            <Search
                                placeholder='input search text'
                                allowClear
                                enterButton='Search'
                                size='large'
                                onSearch={onSearch}
                            />
                        </Col>
                        <Col span={12}>
                            Result for:{' '}
                            {Object.keys(shop.filter).length > 0
                                ? Object.entries(shop.filter).map((item) => `${item[0]}: ${item[1]}, `)
                                : ''}
                        </Col>
                    </Row>
                    <Row>
                        {!shop.isLoading && shop.productList ? (
                            <ProductList data={shop.productList} />
                        ) : (
                            <section>
                                <ul className='list'>
                                    <li className='card flex gap-1'>
                                        <Skeleton height={180} width={240} />
                                        <Skeleton height={180} width={240} />
                                        <Skeleton height={180} width={240} />
                                        <Skeleton height={180} width={240} />
                                    </li>
                                </ul>
                            </section>
                        )}
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default ShopPage
