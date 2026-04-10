import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {},
});

export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

export const useTypedDispatch: () => AppDispatchType = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector;
