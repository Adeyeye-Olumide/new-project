
import { useState, useContext, useReducer } from "react";
import { useEffect } from "react";
import { createContext } from "react";

import { reviewsListener } from "../utils/firestore";
import { HeaderContext } from "./header-context";

export const ReviewsContext = createContext({
    reviews: [],
    setReviews: ()=> null
})

const reviewsReducer = (state, action)=> {
    
    const {type, payload} = action
   
    return payload

}

export const ReviewsProvider = ({children})=> {
    const [reviews, dispatch] = useReducer(reviewsReducer, [])

    // const [reviews, setReviews] = useState([])
    const {setMessage} = useContext(HeaderContext)
    const setReviews = (data)=> dispatch({payload:data})

    


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