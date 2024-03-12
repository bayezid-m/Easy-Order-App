import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


import { User } from "../../types/User"
import { NewUser } from "../../types/NewUser"
import { UserCredential } from "../../types/UserCredential";

const initialState: {
    user: User,
    newUser: NewUser,
    loading: boolean,
    error: string
} = {
    user: {
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        image: '',
        role: '',
    },
    newUser: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        image: '',
        role: '',
        status: ''
    },
    loading: false,
    error: "",
}

export const createSingleUser = createAsyncThunk(
    'createAUser',
    async ({ userData }: { userData: NewUser }) => {
        try {
            const result = await axios.post<NewUser>("http://localhost:4040/api/v1/user/register", userData);
            return result.data; // The returned result will be inside action.payload
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
);


export const login = createAsyncThunk(
    "login",
    async ({ email, password }: UserCredential, { dispatch }) => {
        try {
            const result = await axios.post<{ token: string }>("http://localhost:4040/api/v1/user/login", { email, password })
            const accessToken = result.data.token
            localStorage.setItem("token", accessToken)
            const authentication = await dispatch(authenticate())
            return authentication.payload as User
        }
        catch (e) {
            const error = e as AxiosError
            return error
        }
    }
)
export const authenticate = createAsyncThunk(
    "authenticate",
    async () => {
        try {
            const authentication = await axios.get<{userData: User}>("http://localhost:4040/api/v1/user/getUser",
                {
                    headers: {
                        'access-token': localStorage.getItem('token')
                    }
                }
            )
            return authentication.data.userData           
        }
        catch (e) {
            const error = e as AxiosError
            return error
        }
    }
)




const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(createSingleUser.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.newUser = action.payload;
                }
                state.loading = false
            })
            .addCase(createSingleUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.user = action.payload
                }
                state.loading = false
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.user = action.payload
                }
                state.loading = false
            })
    }
})
const userReducer = usersSlice.reducer
export default userReducer