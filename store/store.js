import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from '../store/api/authApi'
import studentApi from '../store/api/studentApi'
import { authSlice } from "./reducer/authSlice";


const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [studentApi.reducerPath]: studentApi.reducer,
        auth: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authApi.middleware, studentApi.middleware)
    }
});

setupListeners(store.dispatch)

export default store