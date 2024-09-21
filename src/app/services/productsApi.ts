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
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }: { id: number }) => ({ type: 'products' as const, id })),
                        { type: 'products', id: 'LIST' },
                    ]
                    : [{ type: 'products', id: 'LIST' }],
        }),
        deleteDashBoardProducts: builder.mutation({
            query: (id) => ({
                url: `/api/products/${id}`,
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${CookieService.get('jwt')}`
                }
            }),
            invalidatesTags: [{ type: 'products', id: 'LIST' }]
        }),
        updateDashBoardProducts: builder.mutation({
            query: ({ id, body }) => ({
                url: `/api/products/${id}`,
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${CookieService.get('jwt')}`
                },
                body
            }),
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    productsApi.util.updateQueryData('getDashboardProducts', id, (draft) => {
                        Object.assign(draft, patch)
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: [{ type: 'products', id: 'LIST' }]
        }),
        createDashBoardProducts: builder.mutation({
            query: (body) => ({
                url: `/api/products`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${CookieService.get('jwt')}`
                },
                body
            }),
            async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    productsApi.util.updateQueryData('getDashboardProducts', id, (draft) => {
                        Object.assign(draft, patch)
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: [{ type: 'products', id: 'LIST' }]
        })
    })
})

export const { useGetDashboardProductsQuery, useDeleteDashBoardProductsMutation, useUpdateDashBoardProductsMutation, useCreateDashBoardProductsMutation } = productsApi