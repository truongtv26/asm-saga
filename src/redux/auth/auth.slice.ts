import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../types/Type';
import { getUser, signin, signup } from './auth.api';
import { FulfilledAction, PendingAction, RejectAction } from '../../types/asyncThunkType';
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

const authSlice = createSlice({
     name: 'auth',
     initialState,
     reducers: {
          logout (state) {
               return { ...state, user: null}
          }
     },
     extraReducers(builder) {
          builder
          .addCase(signin.fulfilled, (state, action) => {
               return { ...state, user: action.payload.user as IUser}
          })
          .addCase(signup.fulfilled, (state, action) => {
               return { ...state, user: action.payload.user as IUser}
          })
          .addCase(getUser.fulfilled, (state, action) => {
               return { ...state, user: action.payload }
          })
          .addMatcher<PendingAction>(
               (action) => action.type.endsWith('pending'),
               (state) => {
                    return { ...state, isLoading: true}
               }
          )
          .addMatcher<FulfilledAction>(
               (action) => action.type.endsWith('fulfilled'),
               (state) => {
                    return { ...state, isLoading: false, error: null }
               }
          )
          .addMatcher<RejectAction>(
               (action) => action.type.endsWith('rejected'),
               (state, action) => {
                    return { ...state, isLoading: false, error: action.payload}
               }
          )
     }

})

export const { logout } = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer