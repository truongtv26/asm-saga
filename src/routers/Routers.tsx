import { Route, Routes } from 'react-router-dom'
import { 
  BaseLayout, 
  HomePage, 
  PageNotFound, 
  ShopPage,
  SigninPage,
  SignupPage} from '.'

const Routers = () => {
    return (
      <Routes>
        <Route path='/' element={<BaseLayout/>}>
          <Route index element={<HomePage/>} />
          <Route path='shop' element={<ShopPage/>}/>
        </Route>
        
        <Route path='/signin' element={<SigninPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    )
}

export default Routers
