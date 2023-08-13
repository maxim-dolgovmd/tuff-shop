import { configureStore } from '@reduxjs/toolkit'

import categories from './slices/categoriesSlice'
import products from './slices/productsSlice'
import cart from './slices/userSlice'
import { productsApi } from '../api/productsApi'
import { usersApi } from '../api/usersApi'

export const store = configureStore({
    reducer: {
        categories,
        products,
        cart,
        [productsApi.reducerPath]: productsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
        productsApi.middleware,
        usersApi.middleware,
    ]),
})