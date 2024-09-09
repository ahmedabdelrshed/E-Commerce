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
        }
    }
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer;