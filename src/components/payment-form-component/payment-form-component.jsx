import { 
    Elements
} from "@stripe/react-stripe-js";


import { useContext, useEffect, useReducer, useState } from "react";

import axios from  'axios'

import './file.scss'
import { BookingsContext } from "../../contexts/bookings-context";

import { useNavigate } from "react-router-dom";


import { HeaderContext } from "../../contexts/header-context";

import CheckOutComponent from "../checkout-component/checkout-component";


import { returnStripe } from "../../utils/stripe";

import { setMessage } from "../../store/header-reducer";
import { useDispatch, useSelector} from "react-redux";

import Spinner from "../spinner-component/spinner-component";

function PaymentForm(){
    const dispatch = useDispatch()
    const {amount, } = useSelector((state)=> state.bookings)
    
   
    // const {setMessage} = useContext(HeaderContext)



    // const [clientSecret, setClientSecret] = useState(null)
    // const [stripe, setStripe] = useState(null)
    // const [response, setResponse] = useState(null)

    const initialState = {
        clientSecret: null,
        stripe: null,
        response: null
    }

    const paymentReducer = (state , {type, payload})=> {

        switch (type) {
            case 'clientSecret':
                
                return {...state, clientSecret: payload};
            case 'stripe':
            
                return {...state, stripe: payload};
            
            case 'response':
    
                return {...state,response: payload};
            
            default:
                return state;
        }
    }


    const [{stripe, response, clientSecret}, paymentReducerDispatch] = useReducer(paymentReducer, initialState)

    const setStripe = (stripe) => paymentReducerDispatch({type: 'stripe', payload: stripe})
    const setResponse = (response) => paymentReducerDispatch({type: 'response', payload: response})
    const setClientSecret = (clientSecret) => paymentReducerDispatch({type: 'clientSecret', payload: clientSecret})

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
            dispatch(setMessage("You have not booked a room yet, you are being redirected"))
            return navigate('/gallery')
        
        }

        async function makeRequest(){

            const response = await axios.post('https://stripe-payment-ob3j.onrender.com', {
                amount: amount * 100,
            })
    
            console.log(response)

            setResponse(response)
    
            
    
            const {data: {paymentIntent: {client_secret}}} = response
    
            setClientSecret(client_secret)

            setStripe(await returnStripe())

        }


        makeRequest()
       

    },[])


    

   
    
    


    return(
        <>

            { response?.status !=200? <Spinner></Spinner>:
            
            <Elements stripe={stripe} options={{clientSecret, appearance}}>
                <CheckOutComponent clientSecret={clientSecret}></CheckOutComponent>

            </Elements>
            }
        
        </>
      
        
    )
}

export default PaymentForm