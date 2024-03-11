
import { useDispatch, UseDispatch } from "react-redux";
import { useEffect } from "react";

import { setReviews } from "./reviews-reducer";
import { setMessage } from "./header-reducer";
import { reviewsListener } from "../utils/firestore";

function ReviewsFunc(){

    const dispatch = useDispatch()


    
    
    function setReviewsInListener(data){
        dispatch(setReviews(data))
    }

    

    useEffect(()=> {

        try {

            const unsub = reviewsListener(setReviewsInListener)

        
            return ()=> unsub()
            
        } 
        
        catch (error) {
            dispatch(setMessage('Network Problems Detected, Kindly Check Your Network and Reload The Page'))
            
        }

        

    }, [])

}

export default ReviewsFunc