import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './features/loginSlice'
import registerSlice from './features/registerSlice'
import cartSlice from './features/cartSlice'
import globalSlice from './features/globalSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistCartConfig = {
    key: 'cart',
    storage
}
const persistCart = persistReducer(persistCartConfig, cartSlice)

export const store = configureStore({
    reducer: {
        login: loginSlice,
        register: registerSlice,
        cart: persistCart,
        global: globalSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export const persister = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch