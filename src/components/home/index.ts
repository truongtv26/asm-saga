import { getProducts } from './../../redux/shop/api';
import { getProductsRequest, getProductsSuccess, getProductsFailure } from '../../redux/shop/actions'
import HomePage from "./HomePage";
import Slider from "../slides/Slider";
import ProductList from "../shop/ProductList";

export { Slider, ProductList, getProducts, getProductsRequest, getProductsSuccess, getProductsFailure}
export default HomePage
