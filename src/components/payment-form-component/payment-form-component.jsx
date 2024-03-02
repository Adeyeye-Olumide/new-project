import { 
    Elements
} from "@stripe/react-stripe-js";


import { useContext, useEffect, useState } from "react";

import axios from  'axios'

import './file.scss'
import { BookingsContext } from "../../contexts/bookings-context";

import { useNavigate } from "react-router-dom";


import { HeaderContext } from "../../contexts/header-context";

import CheckOutComponent from "../checkout-component/checkout-component";


import { returnStripe } from "../../utils/stripe";

function PaymentForm(){

    const {amount, } = useContext(BookingsContext)
    
   
    const {setMessage} = useContext(HeaderContext)

    const [clientSecret, setClientSecret] = useState(null)
    const [stripe, setStripe] = useState(null)

    const appearance = {
        theme: 'stripe',
        
        variables: {
            colorPrimary: '#0570de',
            colorBackground: '#ffffff',
            colorText: '#30313d',
            colorDanger: '#df1b41',
            fontFamily: 'Ideal Sans, system-ui, sans-serif',
            spacingUnit: '2px',
            borderRadius: '4px',
    // See all possible variables below
  }
      };
    
  
    
    const navigate = useNavigate()



   

    useEffect(()=> {
        if(!amount) {
            setMessage("You have not booked a room yet, you are being redirected")
            return navigate('/gallery')
        
        }

        async function makeRequest(){

            const response = await axios.post('https://stripe-payment-ob3j.onrender.com', {
                amount: amount * 100,
            })
    
            console.log(response)
    
            
    
            const {data: {paymentIntent: {client_secret}}} = response
    
            setClientSecret(client_secret)

            setStripe(await returnStripe())

        }


        makeRequest()
       

    },[])


    

   

    
    


    return(
        <Elements stripe={stripe} options={{clientSecret, appearance}}>
            <CheckOutComponent clientSecret={clientSecret}></CheckOutComponent>

        </Elements>
        
    )
}

export default PaymentForm