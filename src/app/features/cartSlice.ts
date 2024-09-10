import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces";
import { addProductToCart } from "../../utils";

export interface IProductCart extends IProduct {
    quantity: number;
}
interface ICart {
    cartProducts: IProductCart[]
}

const initialState: ICart = {
    cartProducts: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartProducts = addProductToCart(action.payload, state.cartProducts)
        },
        removeFromCart: (state, action) => {
            state.cartProducts = state.cartProducts.filter(product => product.id !== action.payload)
        },
        increaseProductQuantity: (state, action) => {
            state.cartProducts = state.cartProducts.map(item => item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item)
        },
        decreaseProductQuantity: (state, action) => {
            state.cartProducts = state.cartProducts.map(item => item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item)

        },
        clearCart: (state) => {
            state.cartProducts = []
        }
    }
})

export const { addToCart, removeFromCart, increaseProductQuantity, decreaseProductQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer;