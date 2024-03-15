import { createSlice } from "@reduxjs/toolkit"
import { Interface } from "readline"

type State = {
    url: string | null,
    message : string | null
}

type Action = {
    payload : any
}
type Reducers = {
    setUrl: (state : State, action : Action ) => void,
    setMessage : (state: State, action : Action) => void,


}

export type HeaderSlice = {
    name: string,
    initialState: State, 
    reducers: Reducers,

}

const initialState: State = {
    url: null,
    message: null

}


export const headerSlice = createSlice({
    name: 'header',
    initialState ,
    reducers: {
        setUrl(state, action){
            state.url = action.payload 

        },

        setMessage(state, action){
            state.message = action.payload
        }
    }

})

export const headerReducer = headerSlice.reducer


export const {setMessage, setUrl} = headerSlice.actions