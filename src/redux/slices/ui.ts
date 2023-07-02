import { AlertType, UiStateType } from "./../../types/glyph";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UiStateType = {
	isLoading: false,
	error: null,
	warning: null,
};

const uiSlice = createSlice({
	name: "ui",
	initialState: initialState,
	reducers: {
		setIsLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
			const { isLoading } = action.payload;
			state.isLoading = isLoading;
		},
		setError(state, action: PayloadAction<{ error: AlertType }>) {
			const { error } = action.payload;
			state.error = error;
		},
		setWarning(state, action: PayloadAction<{ warning: AlertType }>) {
			const { warning } = action.payload;
			state.warning = warning
		},
	},
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
