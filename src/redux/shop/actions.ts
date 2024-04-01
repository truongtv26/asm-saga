import { createAction } from "@reduxjs/toolkit";
import { FILTER_PRODUCTS, GET_PRODUCT_FAILURE, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS } from "./constants";
import { IProduct } from "../../types/Type";

export const getProductsRequest = createAction(GET_PRODUCTS_REQUEST)
export const getProductsSuccess = createAction<IProduct[]>(GET_PRODUCTS_SUCCESS)
export const getProductsFailure = createAction<string>(GET_PRODUCTS_FAILURE)

export const getProductRequest = createAction(GET_PRODUCT_REQUEST)
export const getProductSuccess = createAction<IProduct>(GET_PRODUCT_SUCCESS)
export const getProductFailure = createAction<string>(GET_PRODUCT_FAILURE)

export const filterProducts = createAction<Object>(FILTER_PRODUCTS)