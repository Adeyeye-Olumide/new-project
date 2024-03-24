

export const reviewsReducer = (state = [],{type, payload})=> {
    
   if (type == 'reviews' && payload) return payload
//    if (type == 'reviews' && !payload) return []
   
    return state

}


export const setReviews = (data)=> ({type: 'reviews', payload: data})


