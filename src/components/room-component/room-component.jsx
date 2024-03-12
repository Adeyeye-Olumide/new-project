
import { useContext, } from "react"
import { RoomContext } from "../../contexts/room-context"

import ButtonComponent from "../button-component/button-component"
import { useNavigate } from "react-router-dom"

import './file.scss'
import { BookingsContext } from "../../contexts/bookings-context"


import { UserContext } from "../../contexts/user-context"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { HeaderContext } from "../../contexts/header-context"


import Spinner from '../spinner-component/spinner-component'
import { setMessage } from "../../store/header-reducer"

import { useSelector, useDispatch } from "react-redux"
import { setAmount, setNightNumber, setSelectedDate} from '../../store/bookings-reducer'

import parseISO from "date-fns/esm/parseISO/index"


import { setId } from '../../store/rooms-reducer'


let datePickerEl, nightNumber, amount

function isValidISODate(dateString) {
    // Step 1: Create a regex pattern to match the ISO format
    var isoPattern = /^d{4}-d{2}-d{2}Td{2}:d{2}:d{2}(.d{1,3})?Z$/;
  
    // Step 2: Check if the date string matches the pattern
    var isValidFormat = isoPattern.test(dateString);
  
    // Step 3: Validate the date string using JavaScript's built-in Date object
    var isValidDate = (new Date(dateString)).toISOString() === dateString;
  
    // Step 4: Return true if the date string is in ISO and UTC format, otherwise false
    return isValidFormat && isValidDate;
  }
function RoomComponent(){

    
    const dispatch = useDispatch()

    const {rooms, id} = useSelector((state)=> state.rooms)
    const selected = useSelector((state)=> state.bookings.selectedDate)

    

    const selectedDate = parseISO(selected)== 'Invalid Date'? selected : parseISO(selected)
   
    const currentUser = useSelector((state)=> state.currentUser)
   

    const todaysDate = new Date()
    
    const navigate = useNavigate()


    console.log(selectedDate)


   


    // function onClick(e){

    //     if (e.target.tagName == 'BUTTON' && e.target.className.split(" ")[1] == 'plain'){
    //         console.log(e.target)

    //         if(!currentUser) return navigate("/authentication")

    //         const id = e.target.closest('.room-details').id
    //         console.log(id)


    //         const amount = e.target.closest('.room-details').querySelector('.price').textContent
        
            
           
    //         setId(id)
        
    //         setAmount(amount)

    //         navigate("/payment")
    //         console.log("clicked")

    //     }
        
    // }

    
    // function runOnSelectedScreenSize(){
    //     // const datePickerEl = document.querySelector(".date-picker")
    //     window.addEventListener('mouseover', ()=> {
    //         if (window.screen.width < 850){
    //             datePickerEl.style.boxShadow = '2px 2px 180px 200px rgba(77, 74, 74, 0.541)'
    //         }

    //         else datePickerEl.style.boxShadow = ''

    //     })
       

    // }
   

    function returnNightNumber(){
        const n = (!nightNumber? nightNumber=1: nightNumber)
        dispatch(setNightNumber(n))

        return n
    }


    function roomChooser(e){

        // return console.log(rooms)
        if(!e.target.closest('.room-details') 
        ) return

        const available = e.target.closest('.room-details')
        .querySelector('.status').className.split(' ')[1]


        console.log('working')
        datePickerEl = document.querySelector(".date-picker")

        
        if(available == 'booked'){
            datePickerEl.classList.add("hideDate")

            return dispatch(setMessage("This Room has been booked, kindly check other rooms"))
        }
        
        const id = e.target.closest('.room-details').id
        amount = +e.target.closest('.room-details').querySelector('.price').textContent

        console.log(amount)
       
        const name = e.target.closest('.room-details').querySelector('h1').textContent

        dispatch(setId(id))

        

        dispatch(setMessage(`You are intending to book ${name}?
        If Yes close this box and pick a date on the right`))

        // runOnSelectedScreenSize()

       datePickerEl.classList.remove("hideDate")





    }

    function bookerFunc(e){
        e.preventDefault()
        if (e.target.className.split(" ")[1] == 'plain') {

            if(!currentUser) {
                dispatch(setMessage("You Have To Create an Account, or Log In"))
                return navigate("/authentication")
            
            }

           dispatch(setAmount(amount* returnNightNumber()))

            

    
            navigate("/payment")
            

            datePickerEl.classList.add("hideDate")

        }


        

    }

  

    return(
        
        <div className="room-container component" onClick={roomChooser}>

            

           
            {rooms.length == 0? <Spinner></Spinner>:
            <div className="room-options">

                {
                    rooms.map(({name, description, id, imageUrl, price, booked})=>{
                        return (
                            <div key={id} id={id} className='room-details'>
                                <img src={imageUrl} alt={name} width='50%' height='300px'/>
                                <div>
                                    <h1>{name}</h1>
                                    <h6>{description}</h6>
                                    <h6>Price: <span className="price">{price}</span> USD</h6>
                                    <h5 className={`status ${booked? "booked": "available"}`}>Status: {booked? "Booked": "Available"}</h5>
                                    
                                </div>
                                
                            </div>
                        )
                    })


                }

            </div>
            }

            <div className="date-picker hideDate" onClick={bookerFunc}>
                <h5>Pick A Date</h5>
                <input className="input-date-picker input-night-numbers" type='number' placeholder="how many nights?" 
                onChange={()=>{
                    nightNumber = +document.querySelector('.input-night-numbers').value
                }}>

                </input>
                <DatePicker className="input-date-picker" selected={selectedDate} onChange={
                    (date)=> {date < todaysDate || date == todaysDate?
                        dispatch(setMessage("You Cannot Book On past Dates or today")):
                        dispatch(setSelectedDate(date))}} dateFormat="MMMM d, yyyy">

                </DatePicker>
                <ButtonComponent text={"BOOK NOW"} buttonType={"plain"}></ButtonComponent>
               

            </div>
            


        </div>
    
    )

}

export default RoomComponent