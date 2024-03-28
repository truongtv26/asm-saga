import Routers from './Routers'

import BaseLayout from '../layouts/BaseLayout'
import HomePage from '../components/home'
import ShopPage from '../components/shop'
import { SigninPage, SignupPage } from '../components/auth'
import { PageNotFound } from '../components/error'

export { BaseLayout, HomePage, ShopPage, SigninPage, SignupPage, PageNotFound }

export default Routers
