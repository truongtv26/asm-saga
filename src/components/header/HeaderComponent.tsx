import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Col, Dropdown, Layout, Row, Space } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { logoutAction } from '../../redux/auth'
import { useCookies } from 'react-cookie'

const { Header } = Layout

const HeaderComponent = () => {
    const user = useSelector((state: RootState) => state.user)
    const [cookies, setCookies, removeCookies] = useCookies()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutAction());
        removeCookies('user');
        navigate('/signin')
    };
    
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <p onClick={handleLogout}>logout</p>
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
                            <ShoppingCartOutlined className='px-1' />
                            cart
                        </li>
                        <li className='italic capitalize cursor-pointer'>
                            {user.isLoading ? (
                                'Loading...'
                            ) : (
                                <>
                                    <UserOutlined className='px-1' />
                                    <Dropdown menu={{ items }}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                {user.user?.fullname}
                                                <CaretDownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </>
                            )}
                        </li>
                    </ul>
                </Col>
            </Row>
        </Header>
    )
}

export default HeaderComponent
