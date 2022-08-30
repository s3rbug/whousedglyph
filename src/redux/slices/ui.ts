import { UiErrorType, UiStateType } from './../../types/glyph';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UiStateType = {
    isLoading: false,
    error: null
}

const uiSlice = createSlice({
    name: "ui",
    initialState: initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<{isLoading: boolean}>) {
            const {isLoading} = action.payload
            state.isLoading = isLoading
        },
        setError(state, action: PayloadAction<{error: UiErrorType}>) {
            const {error} = action.payload
            state.error = error
        }
    }
})

export const uiActions = uiSlice.actions

export default uiSlice.reducer