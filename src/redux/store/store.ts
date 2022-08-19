import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook, useSelector } from "react-redux";
import glyphReducer from "../slices/glyph"
import uiReducer from "../slices/ui"

const store = configureStore({
    reducer: {
        glyph: glyphReducer,
        ui: uiReducer
    }
})

export type AppStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch
export type AppThunkType<ReturnType = Promise<void>> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    AnyAction
>

export const useTypedDispatch: () => AppDispatchType = useDispatch
export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export default store;