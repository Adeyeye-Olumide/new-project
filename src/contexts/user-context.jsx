

import { createContext } from "react"
import { useState } from "react"
import { useEffect } from "react"

import { authStateListener, createUserDoc } from "../utils/firestore"

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: ()=>null,
    isLoaded: false
})


export const UserProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const value = {currentUser,isLoaded}

    useEffect(()=>{
        const unsubscribe = authStateListener(user => {
            console.log(user)
            if(user) createUserDoc(user)
            
            setCurrentUser(user)
            setIsLoaded(true)
        })

        return unsubscribe
        


    },[])

   


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>


}