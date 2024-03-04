
import { useReducer } from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { getDataFromDb, } from "../utils/firestore";

import { HeaderContext } from "./header-context";
import { UserContext } from "./user-context";





export const RoomContext = createContext({
    rooms:[],
    id: null,
    setRoomData:()=>null,
    setId:()=>null

   
})

const state = {
    rooms:[],
    id: null,
}

const roomReducer = (state, {type, payload})=> {
    console.log(payload)
    if (type == 'rooms') return {...state, rooms: payload}
    return {...state, id: payload}
}



export const RoomProvider = ({children})=>{
    const {setMessage, } = useContext(HeaderContext)
    
    // const [rooms, setRoomData] = useState([])

    
    


    // const [id, setId] = useState(null)

    const [{rooms, id}, dispatch] = useReducer(roomReducer, state)


    const setRoomData = (data) => dispatch({type: 'rooms', payload: data})
    const setId = (data) => dispatch({type: 'number', payload: data})

    // const setRoomData = returner()
    // const setId = returner()



  


    // useEffect(()=>{

    //     addCollectionAndDocs('rooms', room)

    // }, [])



   

    useEffect(()=>{

        

        async function getData(){

            try {
                const data = await getDataFromDb()

                

                if(!data.rooms) throw new Error("no network")

                setRoomData(data.rooms)
                // setRoomObj(data)

            


               
                return data
            } 
            catch (error) {
                
                setMessage('Network Problems Detected, Kindly Check Your Network and Reload The Page')
            }
           
        }

        getData()

    }, [])

  


   


   

    const value = {rooms, setRoomData, setId, id}

    return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>


}