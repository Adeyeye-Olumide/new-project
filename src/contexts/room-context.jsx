
import { createContext, useState, useEffect, useContext } from "react";
import { getDataFromDb, } from "../utils/firestore";

import { HeaderContext } from "./header-context";
import { UserContext } from "./user-context";





export const RoomContext = createContext({
    rooms:[],
    roomObj: {},
    setRoomObj: ()=>{},
    id: null,
    setRoomData:()=>null,
    setId: ()=> null,
   
})

export const RoomProvider = ({children})=>{
    const {setMessage, } = useContext(HeaderContext)
    
    const [rooms, setRoomData] = useState([])

    
    

    const [roomObj, setRoomObj] = useState(null)

    const [id, setId] = useState(null)

  


    // useEffect(()=>{

    //     addCollectionAndDocs('rooms', room)

    // }, [])



   

    useEffect(()=>{

        

        async function getData(){

            try {
                const data = await getDataFromDb()

                

                if(!data.rooms) throw new Error("no network")

                setRoomData(data.rooms)
                setRoomObj(data)

            


               
                return data
            } 
            catch (error) {
                
                setMessage('Network Problems Detected, Kindly Check Your Network and Reload The Page')
            }
           
        }

        getData()

    }, [])

  


   


   

    const value = {rooms, setRoomData, id, setId, roomObj}

    return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>


}