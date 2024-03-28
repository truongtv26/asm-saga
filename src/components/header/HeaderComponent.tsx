import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Col, Dropdown, Layout, Row, Space } from 'antd'
import { Link } from 'react-router-dom'
import type { MenuProps } from 'antd'

const { Header } = Layout

const HeaderComponent = () => {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <Link to={'/signin'}>Signin</Link>
        }
    ]
    return (
        <Header className='bg-secondary px-2'>
            <Row>
                <Col span={8} className='text-start'>
                    <ul className='flex gap-2'>
                        <li className='italic capitalize'>
                            <Link to={'/'} className='hover:text-link'>
                                home
                            </Link>
                        </li>
                        <li className='italic capitalize'>
                            <Link to={'/shop'} className='hover:text-link'>
                                shop
                            </Link>
                        </li>
                    </ul>
                </Col>
                <Col span={8} className='text-center font-bold font-mono text-[18px] italic uppercase'>
                    boutique
                </Col>
                <Col span={8} className='text-end'>
                    <ul className='flex gap-2 justify-end'>
                        <li className='italic capitalize cursor-pointer'>
                            <ShoppingCartOutlined className='px-1'/>
                            cart
                        </li>
                        <li className='italic capitalize cursor-pointer'>
                            <UserOutlined className='px-1'/>
                            <Dropdown menu={{ items }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        account
                                        <CaretDownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Header>
    )
}

export default HeaderComponent
