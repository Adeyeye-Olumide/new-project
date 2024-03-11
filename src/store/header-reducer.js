const initialstate = {
    url: null,
    message: null
}

export const headerReducer = (state = initialstate, {type, payload})=>{
    if (type == 'url') return {...state, url: payload}
    if (type == 'message') return {...state, message: payload}

    return state
}


export const setMessage = (message)=> ({type: 'message', payload: message})
export const setUrl = (url)=> ({type: 'url', payload: url})