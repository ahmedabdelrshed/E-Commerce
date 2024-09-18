import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookieService from '../../services/CookieService'


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
        }),
        deleteDashBoardProducts: builder.mutation({
            query: (id) => ({
                url: `/api/products/${id}`,
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${CookieService.get('jwt')}`
                }
            })
        })
    })
})

export const { useGetDashboardProductsQuery, useDeleteDashBoardProductsMutation } = productsApi