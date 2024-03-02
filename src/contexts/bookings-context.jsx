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

export const BookingsProvider = ({children})=>{
    const [bookings, setBooking] = useState([])
    const [amount, setAmount] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [open, setOpen] = useState(false)
    const [nightNumber, setNightNumber] = useState(null)

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
