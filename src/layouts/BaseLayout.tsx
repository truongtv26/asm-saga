import { Outlet } from 'react-router-dom'
import FooterComponent from '../components/footer'
import HeaderComponent from '../components/header'
import { Layout } from 'antd'
import { ToastContainer } from 'react-toastify'

const { Content } = Layout

const BaseLayout = () => {
    return (
        <>
            <Layout className='container mx-auto px-5 bg-secondary'>
                <HeaderComponent />
                <Content>
                    <Outlet />
                </Content>
            </Layout>
            <FooterComponent />
            <ToastContainer/>
        </>
    )
}

export default BaseLayout
