import { Col, Row } from 'antd'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ProductList, Slider  } from '.'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../redux/store'
import { getProducts } from '../../redux/shop/shop.api'

const HomePage = () => {
    const shop = useSelector((state: RootState) => state.shop)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <>
            <div className='rounded-md overflow-hidden mb-3'>
                <Slider />
            </div>
            <div className='mb-3 text-center'>
                <div className='my-8'>
                    <p className='uppercase text-gray-400 text-[22px] italic'>carefully created collections</p>
                    <h2 className='text-black uppercase text-[26px] font-[600] italic'>Browse out categories</h2>
                </div>
                <Row gutter={16} className='mb-3'>
                    <Col span={12} className='rounded-3xl overflow-hidden cursor-pointer'>
                        <img src='/assets/images/product_1.png' className='bg-cover w-full' alt='' />
                    </Col>
                    <Col span={12} className='rounded-lg overflow-hidden cursor-pointer'>
                        <img src='/assets/images/product_2.png' className='bg-cover w-full' alt='' />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8} className='rounded-3xl overflow-hidden cursor-pointer'>
                        <img src='/assets/images/product_3.png' className='bg-cover w-full' alt='' />
                    </Col>
                    <Col span={8} className='rounded-3xl overflow-hidden cursor-pointer'>
                        <img src='/assets/images/product_4.png' className='bg-cover w-full' alt='' />
                    </Col>
                    <Col span={8} className='rounded-3xl overflow-hidden cursor-pointer'>
                        <img src='/assets/images/product_5.png' className='bg-cover w-full' alt='' />
                    </Col>
                </Row>
            </div>
            <div className='mb-3'>
                <div className='my-8'>
                    <p className='uppercase text-gray-400 text-[22px] italic'>made the hard way</p>
                    <h2 className='text-black uppercase text-[26px] font-[600] italic'>toop trending products</h2>
                </div>

                {!shop.isLoading && shop.productList ? (
                    <ProductList data={shop.productList} />
                ) : (
                    <section>
                        <ul className='list'>
                            <li className='card'>
                                <Skeleton height={180} width={240} />
                                <Skeleton height={180} width={240} />
                                <Skeleton height={180} width={240} />
                                <Skeleton height={180} width={240} />
                            </li>
                        </ul>
                    </section>
                )}
            </div>
            <div className='mb-3 bg-primary rounded overflow-hidden'>
                <Row>
                    <Col span={8} className='flex flex-col justify-center items-center p-8'>
                        <h2 className='text-[24px] italic font-roboto capitalize'>free shipping</h2>
                        <p className='text-xs italic capitalize text-gray-400'>free shipping worlwide</p>
                    </Col>
                    <Col span={8} className='flex flex-col justify-center items-center p-8'>
                        <h2 className='text-[24px] italic font-roboto capitalize'>24 x 7 service</h2>
                        <p className='text-xs italic capitalize text-gray-400'>free shipping worlwide</p>
                    </Col>
                    <Col span={8} className='flex flex-col justify-center items-center p-8'>
                        <h2 className='text-[24px] italic font-roboto capitalize'>festival offer</h2>
                        <p className='text-xs italic capitalize text-gray-400'>free shipping worlwide</p>
                    </Col>
                </Row>
            </div>
            <div className='mb-3 py-8'>
                <Row>
                    <Col span={12}>
                        <h2 className='text-[32px] italic font-roboto uppercase'>let's be friend!</h2>
                        <p className='text-xs italic capitalize text-gray-400'>
                            nisi nisi tempor consequat laboris nisi
                        </p>
                    </Col>
                    <Col span={12} className='w-full flex justify-between'>
                        <input
                            className='w-full outline-none border-2 px-3'
                            type='text'
                            placeholder='enter your email address!'
                        />
                        <button className='bg-gray-700 px-4 text-white'>Subscribe</button>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default HomePage
