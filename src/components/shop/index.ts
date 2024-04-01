import ShopPage from "./ShopPage";
import { getProducts } from "../../redux/shop/api";
import { getProductsRequest, getProductsSuccess, getProductsFailure } from "../../redux/shop/actions"

export { getProducts, getProductsRequest, getProductsSuccess, getProductsFailure }

export default ShopPage