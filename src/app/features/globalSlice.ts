import { createSlice } from "@reduxjs/toolkit";

interface IGlobal {
    isOpenCartDrawer: boolean;
}

const initialState: IGlobal = {
    isOpenCartDrawer: false,
}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        onOpenCartDrawer: (state) => {
            state.isOpenCartDrawer = true;
        },
        onCloseCartDrawer: (state) => {
            state.isOpenCartDrawer = false;
        }
    }
});
export const {onCloseCartDrawer,onOpenCartDrawer} = globalSlice.actions;
export default globalSlice.reducer;