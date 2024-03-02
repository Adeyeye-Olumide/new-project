import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";





import home from './images/outdoor.jpg'
import gallery from './images/room.jpg'
import resort from './images/cafe.jpg'
import contact from './images/port.jpg'





const imageUrls = {
    home,
    resort,
    gallery,
    contact,
    payment: ''
}



export const HeaderContext = createContext({
    url:null,
    selectedImage: null,
    menuHandler: (e)=>null,
    message: null,
    setMessage: ()=> null
})


export const HeaderProvider = ({children})=>{



    let segment = localStorage.getItem("segment")

   

    const [url, setUrl] = useState(imageUrls[segment? segment: 'home'])
    const [message, setMessage] = useState(null)

    if (!url) setUrl(imageUrls[segment.split('#')[0]])




    const hrefChange = ()=>{
        
       
       
        const currentURL = window.location.href;


        const urlSegments = currentURL.split('/');

        
   
        const lastSegment = urlSegments[urlSegments.length - 1];

        


        localStorage.setItem("segment", lastSegment)



       

        setUrl(imageUrls[lastSegment? lastSegment: "home"])
    }

    const menuHandler = (e) => {
        const className = e.target.className
     

       

        if (className == "home" || className == "resort" 
        || className == "gallery" || className == "contact" ){

            localStorage.setItem("segment", className)

            setUrl(imageUrls[className])
        }
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

    // useEffect(()=> {
      

       

    //     const signIn = document.querySelector(".authentication-links-container")
    

    //     let timer

    //     if (currentUser){
    //         signIn.querySelector('.signIn').classList.add('left')


    //         timer = setTimeout(() => {
    //             signIn.querySelector('.signOut').classList.remove('right')
    //             clearTimeout(timer)
    //         }, 70);
           

    //     }

    //     else {
    //         signIn.querySelector('.signOut').classList.add('right')

    //         timer = setTimeout(()=>{
    //             signIn.querySelector('.signIn').classList.remove('left')
    //             clearTimeout(timer)
    //         }, 70)
            
    //     }

    // }, [currentUser])

    

    useEffect(()=> {
        const popUp = document.querySelector(".popup-container")
        const closePopUp = popUp.querySelector('span')
        const allComponents = document.querySelectorAll('.component')

        function closePopUpHandler(){
            popUp.style.display = 'none'
            allComponents.forEach(component => {
                component.classList.remove('blur')
            })

            setMessage(null)


        }


       

        if (!message) return

        popUp.style.display = 'block'

        allComponents.forEach(component => component.classList.add('blur'))

        closePopUp.addEventListener('click', closePopUpHandler)

        return ()=> closePopUp.removeEventListener('click', closePopUpHandler)




    }, [message])


    const value = {url, menuHandler, setMessage, message}

    return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>


}