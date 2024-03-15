
import { createSlice } from "@reduxjs/toolkit"




export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: [],
    reducers: {
        setReviews(state, action){

            return action.payload

        }
    }
   
})


export const {setReviews } = reviewsSlice.actions
export const reviewsReducer = reviewsSlice.reducer


