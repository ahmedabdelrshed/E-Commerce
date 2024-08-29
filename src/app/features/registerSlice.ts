import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../conf/axios.config";
import { RegisterData } from "../../interfaces";


interface InitialState {
    isLoading: boolean;
    error: string | null;
}
const initialState: InitialState = {
    isLoading: false,
    error: null,
}

export const registerApi = createAsyncThunk('register/userRegister', async (credentials: RegisterData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const { data } = await axiosInstance.post('/api/auth/local/register', credentials)
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerApi.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerApi.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerApi.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
})
export default registerSlice.reducer;