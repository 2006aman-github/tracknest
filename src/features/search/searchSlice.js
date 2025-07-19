import { createSlice } from "@reduxjs/toolkit";

const init = {
  search: "",
  category: "All",
  level: "All",
  sort: "Default",
};

const searchSlice = createSlice({
  name: "search",
  initialState: init,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setLevel(state, action) {
      state.level = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setSearch, setCategory, setLevel, setSort } =
  searchSlice.actions;
export default searchSlice.reducer;
