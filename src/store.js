import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice.js"
import searchReducer from "@/features/search/searchSlice.js"

export default configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
  },
});

