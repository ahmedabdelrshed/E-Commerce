import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/loginSlice'
import registerSlice from './features/registerSlice'
import cartSlice from './features/cartSlice'
import globalSlice from './features/globalSlice'

export const store = configureStore({
    reducer: {
        login: loginSlice,
        register: registerSlice,
        cart: cartSlice,
        global: globalSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch