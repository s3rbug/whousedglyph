import { UiStateType } from './../../types/glyph';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UiStateType = {
    isLoading: false
}

const uiSlice = createSlice({
    name: "ui",
    initialState: initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<{isLoading: boolean}>) {
            const {isLoading} = action.payload
            state.isLoading = isLoading
        }
    }
})

export const uiActions = uiSlice.actions

export default uiSlice.reducer