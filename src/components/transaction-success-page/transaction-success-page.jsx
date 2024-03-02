
import { BookingsContext } from "../../contexts/bookings-context";
import { UserContext } from "../../contexts/user-context";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../../contexts/room-context";
import { addCollectionAndDocs, update } from "../../utils/firestore";
import { HeaderContext } from "../../contexts/header-context";

import { useContext, useEffect} from "react";

import axios from  'axios'

import addDays from "date-fns/esm/fp/addDays/index.js";



function TransactionSuccessPage(){


    
    const {amount, setBooking, bookings, selectedDate, nightNumber} = useContext(BookingsContext)
    const {currentUser, email, } = useContext(UserContext)
    const {id, rooms, setRoomData,} = useContext(RoomContext)
    const {setMessage} = useContext(HeaderContext)

    const navigate = useNavigate()


    useEffect(()=> {

        async function makeRequest(){

            const response = await axios.post('http://localhost:3001/transaction', {
                amount: amount * 100,
            })
    
            console.log(response)
    
            
    
            // const {data: {paymentIntent: {client_secret}}} = response
    
            // setClientSecret(client_secret)

            // setStripe(await returnStripe())


        }


        makeRequest()


        
    }, [])




    return (
        <div>
            <h1>
                TRANSACTION SUCCESSFULL
            </h1>
        </div>
    )


}

export default TransactionSuccessPage