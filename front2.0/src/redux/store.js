import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers";

const store = configureStore({
    reducer: userSlice.reducer
})

export default store;