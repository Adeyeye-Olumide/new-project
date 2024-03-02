import { useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js/pure";




export async function returnStripe(){
    let stripePromise

   try {

    
    stripePromise = await loadStripe('pk_test_51O1aSCLAUancpoIB5OjUAYMFgoHy8QcEWeIikjCi16dy9VmU0hS0twFxqeezJ5M8B3a1AhJB62X2XJ69jRnfkfeE00zFcWtEtl')
    
   } catch (error) {

    stripePromise = null
    console.log(error)

    
   } 

   return stripePromise




}