import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Item, ItemInfo } from "../../types/Item";
import { NewItem } from "../../types/NewItem";

const initialState: {
    item: Item,
    newItem: NewItem,
    singleItem: Item,
    loading: boolean,
    error: string
} = {
    item: {
        _id: '',
        image: [],
        venue_id: '',
        price: 0,
        description: '',
        name: '',
    },
    singleItem: {
        _id: '',
        image: [],
        venue_id: '',
        price: 0,
        description: '',
        name: '',
    },
    newItem: {
        image: [],
        venue_id: '',
        price: 0,
        description: '',
        name: '',
    },
    loading: false,
    error: "",
}


// export const getItemOfVeneu = createAsyncThunk(
//     'getItems',
//     async (venueId: string) => {
//         //console.log(venueId)
//         try {
//             const item = await axios.get<Item>(`http://localhost:4040/api/v1/item/getItem?venue=${venueId}`)
//             return item.data

//         } catch (e) {
//             const error = e as AxiosError;
//             return error;
//         }
//     }
// )

export const getItemForOwner = createAsyncThunk(
    'getItemForOwner',
    async (venueId: string)=>{
        try {
            const item = await axios.get<Item>(`http://localhost:4040/api/v1/item/getItemOfVenue?venue=${venueId}`)
            return item.data

        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)
export const getSingleItem = createAsyncThunk(
    'getSingleItem',
    async(itemId: string)=>{
        try {
            const itemInfo = await axios.get<{itemInfo:ItemInfo}>(`http://localhost:4040/api/v1/item/getSingleitem/${itemId}`)
            return itemInfo.data.itemInfo
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)
export const addItem = createAsyncThunk(
    'addItem',
    async ({ itemData }: { itemData: NewItem }) => {
        const token = localStorage.getItem('token')
        //console.log(itemData)
        try {
            const result = await axios.post<NewItem>('http://localhost:4040/api/v1/item/addItem', itemData, {
                headers: {
                    'access-token': token
                }
            });
            console.log(result.data)
            return result.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
);

export const deleteItem = createAsyncThunk(
    'deleteItem',
    
    async(itemId: string)=>{
        console.log(itemId)
        const token = localStorage.getItem('token')

        try {
            const itemInfo = await axios.delete<Item>(`http://localhost:4040/api/v1/item/delete/${itemId}`, {
                headers: {
                    'access-token': token
                }
            });
            return itemInfo.data
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    } 
)
const itmeSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            // .addCase(getItemOfVeneu.fulfilled, (state, action) => {
            //     if (action.payload instanceof AxiosError) {
            //         state.error = action.payload.message
            //     } else {
            //         state.item = action.payload;
            //     }
            //     state.loading = false
            // })
            .addCase(getItemForOwner.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.item = action.payload;
                }
                state.loading = false
            })
            .addCase(getSingleItem.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.singleItem = action.payload;
                }
                state.loading = false
            })
            .addCase(addItem.fulfilled, (state, action)=>{
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.newItem = action.payload;
                }
                state.loading = false
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.item = action.payload;
                }
                state.loading = false
            })
    }
})

const itemReducer = itmeSlice.reducer
export default itemReducer