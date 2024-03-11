
const initialstate = {
    bookings: [],
    amount: null,
    selectedDate: null,
    open: false,
    nightNumber: null
}

const keyword = {
    bookings: 'bookings',
    amount: 'amount',
    selectedDate: 'selectedDate',
    open: 'open',
    nightNumber: 'nightNumber'
}


export const bookingsReducer = (state = initialstate, {type, payload})=> {

    
    switch (type) {
        case keyword.bookings:
            return {
                ...state,
                bookings: payload
            }
        case keyword.open:
        
            return {
                ...state, open: !state.open
            }
    
        case keyword.amount:
    
            return {
                ...state,
                amount: payload
            }


        case keyword.nightNumber:
    
            return {
                ...state,
                nightNumber: payload
            }


        case keyword.selectedDate:

            return {
                ...state,
                selectedDate: payload
            }

        
        default:
            return state;
    }




}


export const setSelectedDate = (date)=> ({type: keyword.selectedDate, payload: date})
export const setAmount = (amount)=> ({type: keyword.amount, payload: amount})
export const setBooking = (booking)=> ({type: keyword.bookings, payload: booking})
export const setOpen = ()=> ({type: keyword.open,})
export const setNightNumber = (nightNumber)=> ({type: keyword.nightNumber, payload: nightNumber})