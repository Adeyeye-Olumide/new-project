/* eslint-disable */

import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookingsContext } from '../../contexts/bookings-context'

import { RoomContext } from '../../contexts/room-context'

import { UserContext } from '../../contexts/user-context'


import './file.scss'


function SideBarChild(){

    const {currentUser} = useContext(UserContext)
    const {open, setOpen} = useContext(BookingsContext)
    const {roomObj} = useContext(RoomContext)
 

    

   



    useEffect(()=> {

        const toggleArrow = document.querySelector('.toggle-arrow')
        const reviews = document.querySelector('.reviews')
    
        function toggler(){
            
            reviews.classList.toggle('open')
            setOpen(!open)
           
            
        
        }

        
       
        if(!currentUser) return 
        

        toggleArrow.addEventListener('click', toggler)
        
        
        

       

        return ()=> {
            toggleArrow.removeEventListener('click', toggler)
           
           
        }

    }, [open, currentUser])


    useEffect(()=> {

        const prevBookingsDiv = document.querySelectorAll('.reviews-div')



        

        let arr1 = []


        prevBookingsDiv.forEach((div)=> {

            // if(div.parentNode!= prevBookingsDivParent) return
           
           if (!arr1.includes(div.querySelector('h6').textContent)) return arr1.push(div.querySelector('h6').textContent)
            // div.remove()
           div.style.display = 'none'


        })

    }, [currentUser])

    


   
    


    

    




    let displayName, e_mail

   

    if(currentUser){
        displayName = currentUser.displayName
        e_mail = currentUser.email
    }


    


    return (
      
        <>
            <div className="user-info">
                <h4>Welcome, {displayName? displayName.split(' ')[1]: "Guest"}</h4>
                <h6> {e_mail? e_mail: 'Kindly Sign In'}</h6>
            </div>

            <div className="others">
                <div className='reviews'>
                    <div className='reviews-title'>
                        <h5>My Bookings</h5>
                        {open?<span className='toggle-arrow'>&minus;</span>:
                        <span className='toggle-arrow'>&#43;</span>} 
                    </div>
                    

                    
                    {roomObj && roomObj.bookings?.map((item, index) => {

                        if(item.name != displayName) return

                         

                            return (
                                <div className='reviews-div' key={index}>
                                    <img src={item.booking.imageUrl} alt={item.name} width='40px' height='50px'/>
                                    <h6>{item.booking.name}</h6>
                                </div>
                            )
    

                            
    
                           
    
                            
                            
                            
                        })
                    }
                    
                </div>
                <h5 className='to-reviews-page'>
                   
                    <Link to={currentUser? 'reviews':'authentication'}> Reviews</Link>
                </h5>
            </div>
        </>
        

    )
}

export default SideBarChild