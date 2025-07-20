import {createSlice} from "@reduxjs/toolkit"

const init = {
    user: null,
    userProfile: null,
    isAuth: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState: init,
    reducers: {
        login(state,action){
            state.user = action.payload.user;
            state.userProfile = action.payload.userProfile;
            state.isAuth = true;
        },
        logout(state){
            state.user = null;
            state.userProfile = null;
            state.isAuth = false;
        },
    },
})

export const {login,logout} = authSlice.actions;
export default authSlice.reducer;