import { configureStore } from "@reduxjs/toolkit";
import chemicals from "./reducers/chemicals";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        chemicals
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useTypedDispatch: () => AppDispatch = useDispatch
