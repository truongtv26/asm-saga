import { Navigate, Route, Routes } from 'react-router-dom'
import { BaseLayout, HomePage, PageNotFound, PrivateRoute, ProductDetail, ShopPage, SigninPage, SignupPage } from '.'
import { useCookies } from 'react-cookie';

const Routers = () => {
    const [cookies] = useCookies(['user']);
    
    return (
        <Routes>
            <Route path='/signin' element={ Boolean(cookies['user']) ? <Navigate to={'/'}/> : <SigninPage />}/>
            <Route path='/signup' element={ Boolean(cookies['user']) ? <Navigate to={'/'}/> :<SignupPage />}/>
            <Route
                path='/'
                element={
                    <PrivateRoute isAllowed={() => Boolean(cookies['user'])}>
                        <BaseLayout />
                    </PrivateRoute>
                }
            >
                <Route index element={<HomePage />} />
                <Route path='/shop' element={<ShopPage />} />
                <Route path='/detail/:id' element={<ProductDetail />} />
            </Route>
            
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default Routers
