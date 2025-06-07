import { createSlice } from "@reduxjs/toolkit";
import Tuser from "../Ts/UserRegiste";


const initialState = {
 user:null as Tuser | null,
}

const userSlice = createSlice({

    name: "user",
    initialState,
    reducers: {
       login :(state, data) => {
        state.user = data.payload;
       },
         logout :(state) => {
          state.user = null;
         },
    },
});

export const userActions = userSlice.actions;
export default  userSlice.reducer;
