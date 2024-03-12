import { useEffect } from "react";

import { setUrl, setMessage } from "./header-reducer";
import { setSelectedDate } from "./bookings-reducer";



import home from './images/outdoor.jpg'
import gallery from './images/room.jpg'
import resort from './images/cafe.jpg'
import contact from './images/port.jpg'
import { useDispatch, useSelector } from "react-redux";


const imageUrls = {
    home,
    resort,
    gallery,
    contact,
}

function HeaderFunc(){

    ///////HEADERCOMPONENT AND NAVBAR//////

    const {url, message }= useSelector((state)=> state.header)
    const dispatch = useDispatch()

    let segment = localStorage.getItem("segment")

    if (!url) dispatch(setUrl(imageUrls[segment.split('#')[0]]))


    

    const hrefChange = ()=>{
        
       
       
        const currentURL = window.location.href;


        const urlSegments = currentURL.split('/');

        
   
        const lastSegment = urlSegments[urlSegments.length - 1];

        


        localStorage.setItem("segment", lastSegment)



       

       dispatch(setUrl(imageUrls[lastSegment? lastSegment: "home"])) 
    }

    
    useEffect(()=> {
        const element = document.querySelector('.header-container')
        
        const dropdowns = element.querySelectorAll(".drop")

        const home = element.querySelector(".home")
        const resort = element.querySelector(".resort")


        const dropdownHandler = (e)=> {
            
            dropdowns.forEach(dropdown=>{
                
                if (e.target.id === dropdown.id) dropdown.style.visibility = 'visible'
               
                else dropdown.style.visibility = 'hidden'
                
            })
        }

        
        

        


        

        window.addEventListener('popstate', hrefChange)

        element.addEventListener("click", dropdownHandler)
        home.addEventListener("mouseenter", dropdownHandler)
        resort.addEventListener("mouseenter", dropdownHandler)


       
        

       

        element.style.backgroundImage = `url(${url})`

        let timer = setTimeout(() => {
            element.classList.add("fade-in")

            clearTimeout(timer)
        }, 1000);


        
        return ()=>{
            element.classList.remove("fade-in")
            window.removeEventListener('popstate', hrefChange)

           
            element.removeEventListener("click", dropdownHandler)
            home.removeEventListener("mouseenter", dropdownHandler)
            resort.removeEventListener("mouseenter", dropdownHandler)
            
           
            
        }

    }, [url])

    
    useEffect(()=> {
        const popUp = document.querySelector(".popup-container")
        const closePopUp = popUp.querySelector('span')
        const allComponents = document.querySelectorAll('.component')

        function closePopUpHandler(){
            popUp.style.display = 'none'
            allComponents.forEach(component => {
                component.classList.remove('blur')
            })

            dispatch(setMessage(null))


        }


       

        if (!message) return

        popUp.style.display = 'block'

        allComponents.forEach(component => component.classList.add('blur'))

        closePopUp.addEventListener('click', closePopUpHandler)

        return ()=> closePopUp.removeEventListener('click', closePopUpHandler)




    }, [message])

    //////////////////////////////////////////////////////////////////////////


    //////////FOR THE DATEPICKER////////
    useEffect(()=> {
        dispatch(setSelectedDate((new Date())))
    

    }, [])

    /////////////////////////////////////

    //////RETURNS HANDLER FUNCTION//////////////////////////
    return (e) => {
        const className = e.target.className
     

       

        if (className == "home" || className == "resort" 
        || className == "gallery" || className == "contact" ){

            localStorage.setItem("segment", className)

            dispatch(setUrl(imageUrls[className]))
        }
    }

}

export default HeaderFunc