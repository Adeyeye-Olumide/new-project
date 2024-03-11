

import { getDataFromDb } from "../utils/firestore"

import { useEffect } from "react"

import { useDispatch } from "react-redux"


import { setRoomData, setRoomObj } from "./rooms-reducer"
import { setMessage } from "./header-reducer"



function RoomsFunc (){

    const dispatcher = useDispatch()

    useEffect(()=>{

        

        async function getData(){

            try {
                const data = await getDataFromDb()

                

                if(!data.rooms) throw new Error("no network")

                dispatcher(setRoomData(data.rooms))
                dispatcher(setRoomObj(data))

            


               
                return data
            } 
            catch (error) {
                
                dispatcher(setMessage('Network Problems Detected, Kindly Check Your Network and Reload The Page'))
            }
           
        }

        getData()

    }, [])


}


export default RoomsFunc