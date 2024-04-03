import { AsyncThunk } from "@reduxjs/toolkit"

export type GenerateAsyncThunk = AsyncThunk<unknown, unknown, any>
export type PendingAction = ReturnType<GenerateAsyncThunk['pending']>
export type RejectAction = ReturnType<GenerateAsyncThunk['rejected']>
export type FulfilledAction = ReturnType<GenerateAsyncThunk['fulfilled']>