import { getUserSuccess, logoutAction, signinFailure, signinSuccess, signupFailure, signupRequest, signupSuccess } from './actions';
import { createReducer } from "@reduxjs/toolkit";
import { IUser } from "../../types/Type";
import { getUserFailure, getUserRequest, signinRequest } from ".";

type AuthState = {
     user: IUser | null,
     isLoading: boolean,
     currentRequest: string,
     error: any
}

const initialState: AuthState = {
     user: null,
     isLoading: false,
     currentRequest: '',
     error: null
}    

const AuthReducer = createReducer(initialState, builder => {
     builder
     .addCase(signinRequest, (state) => {
          return { ... state, isLoading: true}
     })
     .addCase(signinSuccess, (state, action) => {
          return {...state, user: action.payload, error: null, isLoading: false }
     })
     .addCase(signinFailure, (state, action) => {
          return { ...state, isLoading: false, error: action.payload,}
     })
     .addCase(logoutAction, (state) => {
          return { ...state, user: null}
     })
     .addCase(signupRequest, (state) => {
          return { ...state, isLoading: true}
     })
     .addCase(signupSuccess, (state, action) => {
          return { ...state, user: action.payload, error: null, isLoading: false }
     })
     .addCase(signupFailure, (state, action) => {
          return { ...state, error: action.payload, isLoading: false}
     })
     .addCase(getUserRequest, (state) => {
          return {...state, isLoading: true,}
     })
     .addCase(getUserSuccess, (state, action) => {
          return {...state, user: action.payload, isLoading: false}
     })
     .addCase(getUserFailure, (state, action) => {
          return { ...state, error: action.payload, isLoading: false}
     })
     .addDefaultCase((state) => state)
})

export default AuthReducer