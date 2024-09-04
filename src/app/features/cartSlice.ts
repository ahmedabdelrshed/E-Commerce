import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaces";

interface ICart {
    cartProducts: IProduct[]
}

const initialState: ICart = {
    cartProducts: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartProducts = [...state.cartProducts, action.payload]
        }
    }
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer;