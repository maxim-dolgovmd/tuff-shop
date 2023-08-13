import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import { buildUrl } from '../utils/common'

const API_URL = 'https://api.escuelajs.co/api/v1/'

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery(
        {baseUrl: API_URL}
    ),
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: (id) => {
                return {
                    url: `products/${id}`,
                    method: 'GET'
                }
            }
        }),
        searchProducts: builder.query({
            query: (params) => buildUrl('/products', params), 
            method: 'GET',
        })
    })
})

export const {
    useGetProductQuery,
    useSearchProductsQuery,
} = productsApi