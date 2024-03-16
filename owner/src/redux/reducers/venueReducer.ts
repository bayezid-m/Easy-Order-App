import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Venue } from "../../types/Venue";
import { NewVenue } from "../../types/NewVenue";


const initialState: {
    venue: Venue,
    newVenue: NewVenue,
    loading: boolean,
    error: string
} = {
    venue: {
        _id: '',
        name: '',
        image: '',
        location: '',
        description: '',
        owner: '',
        code: '',
    },
    newVenue: {
        name: '',
        image: '',
        location: '',
        description: '',
    },
    loading: false,
    error: "",
}

export const createVenue = createAsyncThunk(
    'createVenue',
    async ({ venueData }: { venueData: NewVenue }) => {
        const token = localStorage.getItem('token')

        try {
            const result = await axios.post<NewVenue>("http://localhost:4040/api/v1/venue/create", venueData,
            {
                headers: {
                    'access-token': token
                }
            });
            return result.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
);

export const getVenueByToken = createAsyncThunk(
    'getVenueByToken',
    async () => {
        const token = localStorage.getItem('token')
        try {
            const venue = await axios.get<{venueInfo:Venue}>("http://localhost:4040/api/v1/venue/getVenueById",
                {
                    headers: {
                        'access-token': token
                    }
                }
            )
            return venue.data.venueInfo
        } catch (e) {
            const error = e as AxiosError
            return error
        }
    }
);

const venueSlice = createSlice({
    name: "venue",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(createVenue.fulfilled, (state, action)=>{
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.newVenue = action.payload;
                }
                state.loading = false
            })
            .addCase(getVenueByToken.fulfilled, (state, action)=>{
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.venue = action.payload;
                }
                state.loading = false
            })
    }
})
const venueReducer = venueSlice.reducer
export default venueReducer