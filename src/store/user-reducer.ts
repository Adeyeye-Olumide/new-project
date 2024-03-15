

import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name:'user',
    initialState: null,
    reducers: {
        setCurrentUser(state, action){

            return action.payload
        }
    }
})

export const userReducer = userSlice.reducer

export const { setCurrentUser } = userSlice.actions