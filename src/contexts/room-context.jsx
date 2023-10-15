
import { createContext, useState } from "react";
import rooms from '../room-data.json'

export const RoomContext = createContext({
    roomData:[]
})

export const RoomProvider = ({children})=>{
    const [roomData, setRoomData] = useState(rooms)

    const value = {roomData}

    return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>


}