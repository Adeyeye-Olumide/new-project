
const initialstate = {
    id: null,
    roomsObj: {},
    rooms: []
}


export const roomsReducer = (state = initialstate, {type, payload})=> {
    if (type == 'roomsObj') return {...state, roomsObj: payload}
    if (type == 'rooms') return {...state, rooms: payload}

    if (type == 'number') return {...state, id: payload}

    return state
}


export const setRoomObj = (data) => ({type: 'roomsObj', payload: data})
export const setId = (data) => ({type: 'number', payload: data})
export const setRoomData = (data) => ({type: 'rooms', payload: data})
