

import { 
     
    useElements, 
    useStripe, 
    PaymentElement,
    
} from "@stripe/react-stripe-js";

import ButtonComponent from "../button-component/button-component";
import { useContext, useEffect, useState } from "react";

import axios from  'axios'

import { BookingsContext } from "../../contexts/bookings-context";
import { UserContext } from "../../contexts/user-context";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../../contexts/room-context";
import { update } from "../../utils/firestore";
import { HeaderContext } from "../../contexts/header-context";
import Spinner from "../spinner-component/spinner-component";

import addDays from "date-fns/esm/fp/addDays/index.js";

import parseISO from "date-fns/parseISO/index";

import { useSelector, useDispatch } from "react-redux";

import { setMessage } from "../../store/header-reducer";

import { setRoomData } from "../../store/rooms-reducer";

function CheckOutComponent(prop) {

    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()

    const {selectedDate, nightNumber, amount,} = useSelector((state)=> state.bookings)
    const currentUser = useSelector((state)=> state.currentUser)
    const {id, rooms, } = useSelector((state)=> state.rooms)

    
    // const {setMessage} = useContext(HeaderContext)

    const [isProcessing, setIsProcessing] = useState(false)

    const navigate = useNavigate()


    
   
  
    

    useEffect(()=> {


        let timer = setTimeout(()=>{

            document.querySelector('#payment-form').classList.remove("blur")

        }, 5000)


        return ()=> clearTimeout(timer)

    }, [])


    const paymentHandler = async(e)=> {

        e.preventDefault()

        if (!stripe || ! elements) return

        try {

        


            const {error, paymentIntent: {status}} = await stripe.confirmPayment({
                elements,
                redirect: 'if_required',
                confirmParams: {
                    return_url: `${window.location.origin}/transactionsuccess`,
                    receipt_email: currentUser.email
                }
            })


            setIsProcessing(true)
            dispatch(setMessage('Payment is being processed, Do not refresh the page'))

    
    
            if (error) return setMessage("Payment not successful, Booking Aborted, try again")

            if (status ==='succeeded') {
                
                const updatedRoom = rooms.map(room=> room.id == id? {...room, booked:true}: room)
                const filtered = updatedRoom.filter(room=>room.booked == true && room.id == id)[0]

                dispatch(setMessage(`Payment Successful, You have booked ${filtered.name}`))
            

                dispatch(setRoomData(updatedRoom))
                
                update(updatedRoom, 'rooms')
                
    
                update({
                    booking: filtered,
                    name: currentUser.displayName,
                    email: currentUser.email,
                    booking_date: new Date(),
                    check_in_date: selectedDate,
                    check_in_expiry_date: new Date(addDays(nightNumber, selectedDate).setHours(12,0,0))
                }, 'bookings')


                    
                const response = await axios.post('https://messenger-437n.onrender.com', {
                    amount,
                    booking: filtered,
                    name: currentUser.displayName,
                    email: currentUser.email,

                })
        
                console.log(response)



                navigate('/resort')




                
    

            }
    
        
           
    
                
               
                
            
    
            
    
            
        
                   
    
    
    
        }
        catch(error){
            console.log(error)
        }


    }
 
    

   





    return(
       
            <form  id='payment-form'  onSubmit={paymentHandler} className='component blur'>

                {
                    isProcessing? <Spinner></Spinner>:
                    <div>
                        <div className="form-header">
                            <h4 className="title">Credit card detail</h4>
                        </div>
                        <PaymentElement></PaymentElement>
                        <ButtonComponent text='PAY NOW' buttonType ='payment' disabled={isProcessing}></ButtonComponent>
            

                    </div>
                }
                
            </form>
        
        
    
        
    )
}

export default CheckOutComponent