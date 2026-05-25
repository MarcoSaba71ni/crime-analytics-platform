import { configureStore } from '@reduxjs/toolkit';
import savedReducer from './savedSlice';

export const store = configureStore({
    reducer: {
        saved: savedReducer,
    },
});