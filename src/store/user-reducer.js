// const initialstate = {
//     currentUser:  null
// }

export const userReducer = (state = null, {type, payload}) => {
    if (type == 'user' && payload.providerId) return payload

    return state
}

export const setCurrentUser = (user) => ({type: 'user', payload: user})