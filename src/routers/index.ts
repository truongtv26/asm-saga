import Routers from './Routers'

import BaseLayout from '../layouts/BaseLayout'
import HomePage from '../components/home'
import ShopPage from '../components/shop'
import { SigninPage, SignupPage } from '../components/auth'
import { PageNotFound } from '../components/error'
import PrivateRoute from '../components/PrivateRoute'

export { 
     BaseLayout, 
     HomePage, 
     ShopPage, 
     SigninPage, 
     SignupPage, 
     PageNotFound, 
     PrivateRoute 
}

export default Routers
