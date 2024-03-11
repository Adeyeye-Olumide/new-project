import { useReducer } from "react";
import { useEffect } from "react";
import { createContext, useState,} from "react";


export const BookingsContext = createContext({
    bookings:[],
    setBooking: ()=> null,
    amount: null,
    setAmount: ()=> null,
    selectedDate: null,
    setSelectedDate: ()=>null,
    open: false,
    setOpen: ()=>null,
    nightNumber: null,
    setNightNumber: ()=> null
})
const initialstate = {
    bookings: [],
    amount: null,
    selectedDate: null,
    open: false,
    nightNumber: null
}
const bookingsReducer = (state , action)=> {
    const {type, payload} = action

    switch (type) {
        case 'setBooking':
            return {
                ...state,
                bookings: payload
            }
        case 'setOpen':
        
            return {
                ...state,
                open: payload
            }
    
        case 'setAmount':
    
            return {
                ...state,
                amount: payload
            }


        case 'setNightNumber':
    
            return {
                ...state,
                nightNumber: payload
            }


        case 'setSelectedDate':

            return {
                ...state,
                selectedDate: payload
            }

        
        default:
            return state;
    }
}



export const BookingsProvider = ({children})=>{
    // const [bookings, setBooking] = useState([])
    // const [amount, setAmount] = useState(null)
    // const [selectedDate, setSelectedDate] = useState(null)
    // const [open, setOpen] = useState(false)
    // const [nightNumber, setNightNumber] = useState(null)

    const [{bookings, open, nightNumber, amount, selectedDate}, dispatch] = useReducer(bookingsReducer, initialstate)

    const setSelectedDate = (date)=> dispatch({type: 'setSelectedDate', payload: date})
    const setAmount = (amount)=> dispatch({type: 'setAmount', payload: amount})
    const setBooking = (booking)=> dispatch({type: 'setBooking', payload: booking})
    const setOpen = ()=> dispatch({type: 'setOpen', payload: !open})
    const setNightNumber = (nightNumber)=> dispatch({type: 'setNightNumber', payload: nightNumber})

    useEffect(()=> {
        setSelectedDate((new Date()))
    

    }, [])


  
    

    const value = {
        bookings, setBooking, amount, 
        setAmount, selectedDate, setSelectedDate, 
        open, setOpen, nightNumber,
        setNightNumber}

    return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>
}
