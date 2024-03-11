

export const reviewsReducer = (state = [],{type, payload})=> {
    
   if (type == 'reviews') return payload
   
    return state

}


export const setReviews = (data)=> ({type: 'reviews', payload: data})


