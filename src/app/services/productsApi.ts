import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const productsApi = createApi({
    reducerPath: 'api',
    tagTypes: ['products'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}` }),
    endpoints: (builder) => ({
        getDashboardProducts: builder.query({
            query: () => ({
                url: '/api/products?populate=thumbnail,category&sort=createdAt:DESC',
            }),
        })
    })
})

export const { useGetDashboardProductsQuery } = productsApi