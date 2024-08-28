import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../conf/axios.config";
import { LoginData } from "../../interfaces";


interface ResponseData {
    jwt: string
    user: {
        id: number
        username: string
        email: string
    }
}
interface InitialState {
    isLoading: boolean;
    error: string | null;
    data: ResponseData;
}
const initialState: InitialState = {
    isLoading: false,
    error: null,
    data: {
        jwt: '',
        user: {
            id: 0,
            username: '',
            email: '',
        }
    }
}

export const login = createAsyncThunk('login/userLogin', async (credentials: LoginData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const { data } = await axiosInstance.post('/api/auth/local', credentials)
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
}
)

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<ResponseData>) => {
                state.isLoading = false;
                state.data.user = action.payload.user;
                state.data.jwt = action.payload.jwt;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
})
export default loginSlice.reducer;