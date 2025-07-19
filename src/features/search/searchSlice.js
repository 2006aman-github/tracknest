import { createSlice } from "@reduxjs/toolkit";

const init = {
    search: "",
}

const searchSlice = createSlice({
    name: "search",
    initialState: init,
    reducers:{
        setSearch(state,action){
            state.search = action.payload;
        }
    }
})

export const {setSearch} = searchSlice.actions;
export default searchSlice.reducer;