import { createAction } from "@reduxjs/toolkit";
import { GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS } from "./constants";
import { IProduct } from "../../types/Type";

export const getProductsRequest = createAction(GET_PRODUCTS_REQUEST)
export const getProductsSuccess = createAction<IProduct[]>(GET_PRODUCTS_SUCCESS)
export const getProductsFailure = createAction<string>(GET_PRODUCTS_FAILURE)