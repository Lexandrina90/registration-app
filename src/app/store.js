import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import userReducer from '../entities/user/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});