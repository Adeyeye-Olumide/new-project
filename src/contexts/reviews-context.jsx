
import { useState, useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";

import { reviewsListener } from "../utils/firestore";
import { HeaderContext } from "./header-context";

export const ReviewsContext = createContext({
    reviews: [],
    setReviews: ()=> null
})

export const ReviewsProvider = ({children})=> {
    const [reviews, setReviews] = useState(null)
    const {setMessage} = useContext(HeaderContext)


    function setReviewsInListener(data){
        setReviews(data)
    }

    

    useEffect(()=> {

        try {

            const unsub = reviewsListener(setReviewsInListener)

        
            return ()=> unsub()
            
        } 
        
        catch (error) {
            setMessage('Network Problems Detected, Kindly Check Your Network and Reload The Page')
            
        }

        

    }, [])

    const value = {reviews}

    return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
}