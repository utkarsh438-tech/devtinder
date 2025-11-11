import {createSlice} from '@reduxjs/toolkit';
 


const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;},
        clearFeed: (state,action) => {
            if (!state || !action.payload) return state;
            // Handle state structure: { data: [...] } or array
            if (state.data && Array.isArray(state.data)) {
                const filteredData = state.data.filter(user => user._id !== action.payload);
                return { ...state, data: filteredData };
            } else if (Array.isArray(state)) {
                return state.filter(user => user._id !== action.payload);
            }
            return state;
        }
    }
});

export const { addFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;