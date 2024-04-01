import { createAction } from "@reduxjs/toolkit";
import { 
     GET_USER_FAILURE, 
     GET_USER_REQUEST, 
     GET_USER_SUCCESS, 
     SIGNIN_FAILURE, 
     SIGNIN_REQUEST, 
     SIGNIN_SUCCESS,
     LOGOUT,
     SIGNUP_REQUEST,
     SIGNUP_SUCCESS,
     SIGNUP_FAILURE
} from ".";

import { IUser } from "../../types/Type";


export const signinRequest = createAction(SIGNIN_REQUEST)
export const signinSuccess = createAction<IUser>(SIGNIN_SUCCESS)
export const signinFailure = createAction<string>(SIGNIN_FAILURE)
export const signupRequest = createAction(SIGNUP_REQUEST)
export const signupSuccess = createAction<IUser>(SIGNUP_SUCCESS)
export const signupFailure = createAction<string>(SIGNUP_FAILURE)
export const logoutAction = createAction(LOGOUT)

export const getUserRequest = createAction(GET_USER_REQUEST)
export const getUserSuccess = createAction<IUser>(GET_USER_SUCCESS)
export const getUserFailure = createAction(GET_USER_FAILURE)
