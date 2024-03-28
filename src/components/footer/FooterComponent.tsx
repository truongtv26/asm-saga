import { Col, Layout, Row } from 'antd'

const { Footer } = Layout

const FooterComponent = () => {
    return (
        <Footer className='p-0 bg-gray-800'>
            <Row className='container mx-auto py-10 px-2'>
                <Col span={8}>
                    <ul className='flex flex-col gap-1'>
                        <li>
                            <h2 className='uppercase text-white text-[16px] italic'>customer services</h2>
                        </li>
                        <li>
                            <p className='pt-3 capitalize text-white italic'>return and refunds</p>
                        </li>
                        <li>
                            <p className='pt-3 capitalize text-white italic'>online stores</p>
                        </li>
                        <li>
                            <p className='pt-3 capitalize text-white italic'>term and conditions</p>
                        </li>
                    </ul>
                </Col>
                <Col span={8} className='text-white'>
                    <ul className='flex flex-col gap-1'>
                        <li>
                            <h2 className='uppercase text-white text-[16px] italic'>company</h2>
                        </li>
                        <li>
                            <p className='pt-3 capitalize text-white italic'>what we do</p>
                        </li>
                        <li>
                            <p className='pt-3 capitalize text-white italic'>avaliable services</p>
                        </li>
                        <li>
                            <p className='pt-3 capitalize text-white italic'>latest posts</p>
                        </li>
                        <li>
                            <p className='pt-3 capitalize text-white italic'>FAQs</p>
                        </li>
                    </ul>
                </Col>
                <Col span={8} className='text-white'>
                    <ul className='flex flex-col gap-1'>
                        <li>
                            <h2 className='uppercase text-white text-[18px] italic'>social media</h2>
                        </li>
                        <li>
                            <p className='pt-3 capitalize text-white italic'>twitter</p>
                        </li>
                        <li>
                            <p className='pt-3 capitalize text-white italic'>intagram</p>
                        </li>
                        <li>
                            <p className='pt-3 capitalize text-white italic'>facebook</p>
                        </li>
                        <li>
                            <p className='pt-3 capitalize text-white italic'>pinterest</p>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Footer>
    )
}

export default FooterComponent
