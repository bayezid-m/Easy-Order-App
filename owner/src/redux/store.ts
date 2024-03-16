import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/userReducer";
import venueReducer from "./reducers/venueReducer";
import itemReducer from "./reducers/itemReducer";

const store = configureStore({
    reducer: {
        userReducer,
        venueReducer,
        itemReducer
    }
})

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 
export default store