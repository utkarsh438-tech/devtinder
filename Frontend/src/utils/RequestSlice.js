import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null, 
    reducers: {
        addRequests: (state, action) => {
            return action.payload;},
        clearRequests: (state,action) => {
            const newArray=state.filter (r=>!r._id!=action.payload)
        return newArray},
    },
}); 
export const { addRequests, clearRequests } = requestSlice.actions;
export default requestSlice.reducer;