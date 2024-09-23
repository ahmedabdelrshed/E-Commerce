import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CookieService from '../../services/CookieService'

export const categoriesApi = createApi({
    reducerPath: "api/categories",
    tagTypes: ['categories'],
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}` }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: "/api/categories"
            }),
            providesTags: (result) =>

                result
                    ? [
                        ...result.data.map(({ id }: { id: number }) => ({ type: 'categories' as const, id })),
                        { type: 'categories', id: 'LISTCaT' },
                    ]
                    : [{ type: 'categories', id: 'LISTCaT' }],
        }),
        createDashBoardCategories: builder.mutation({
            query: (body) => ({
                url: `/api/categories`,
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${CookieService.get('jwt')}`
                },
                body
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data: newCategory } = await queryFulfilled;
                    dispatch(
                        categoriesApi.util.updateQueryData('getCategories', undefined, (draft) => {
                            draft.data.push(newCategory);
                        })
                    );
                } catch (error) {
                    console.error('Error updating categories:', error);
                }
            },
            invalidatesTags: [{ type: 'categories', id: 'LISTCaT' }]
        }),
        deleteDashBoardCategories: builder.mutation({
            query: (id) => ({
                url: `/api/categories/${id}`,
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${CookieService.get('jwt')}`
                }
            }),
            invalidatesTags: [{ type: 'categories', id: 'LISTCaT' }]
        }),
    })
})

export const { useGetCategoriesQuery, useCreateDashBoardCategoriesMutation,useDeleteDashBoardCategoriesMutation } = categoriesApi