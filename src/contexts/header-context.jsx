import { useContext, useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { UserContext } from "./user-context";


const imageUrls = {
    home: 'http://localhost:3000/static/media/martian%20outdoor.41a8d3194828b42060b3.jpg',
    resort: 'http://localhost:3000/static/media/room.7e1527e8919a8c585a4f.jpg',
    gallery: 'http://localhost:3000/static/media/cafe.67cd1ce858f55a13f281.jpg',
    contact: ' http://localhost:3000/static/media/port.7827d772516917e6560e.jpg',

   
    


}

export const HeaderContext = createContext({
    url:null,
    selectedImage: null,
    menuHandler: (e)=>null
})


export const HeaderProvider = ({children})=>{

    const {currentUser} = useContext(UserContext)


    let segment = localStorage.getItem("segment")

    const [url, setUrl] = useState(imageUrls[segment? segment: 'home'])

    const hrefChange = ()=>{
        
       
       
        const currentURL = window.location.href;


        const urlSegments = currentURL.split('/');

        
   
        const lastSegment = urlSegments[urlSegments.length - 1];

        


        localStorage.setItem("segment", lastSegment)



        console.log(segment)
        
       

        setUrl(imageUrls[lastSegment? lastSegment: "home"])
    }

    const menuHandler = (e) => {
        const className = e.target.className
        console.log(className)

       

        if (className == "home" || className == "resort" 
        || className == "gallery" || className == "contact" ){

            localStorage.setItem("segment", className)

            setUrl(imageUrls[className])
        }
    }

   

    useEffect(()=> {
        const element = document.querySelector('.header-container')
        const homeLink = element.querySelector(".home-link")
        const dropDownContent = element.querySelector(".dropdown-content")

        

        const dropDownOpen = ()=> {
            dropDownContent.style.display='block'

           
        }

        const dropDownClose = ()=> {
            dropDownContent.style.display='none'
            
            
        }

        

        window.addEventListener('popstate', hrefChange)



        homeLink.addEventListener("mouseenter", dropDownOpen)

        element.addEventListener("click", dropDownClose)

       
        

        console.log(url)

        element.style.backgroundImage = `url(${url})`

        let timer = setTimeout(() => {
            element.classList.add("fade-in")

            clearTimeout(timer)
        }, 1000);


        
        return ()=>{
            element.classList.remove("fade-in")
            window.removeEventListener('popstate', hrefChange)

            homeLink.removeEventListener("mouseenter", dropDownOpen)
            element.removeEventListener("click", dropDownClose)
            
           
            
        }

    }, [url])

    useEffect(()=> {
      

       

        const signIn = document.querySelector(".authentication-links-container")
    

        let timer

        if (currentUser){
            signIn.querySelector('.signIn').classList.add('left')


            timer = setTimeout(() => {
                signIn.querySelector('.signOut').classList.remove('right')
                clearTimeout(timer)
            }, 70);
           

        }

        else {
            signIn.querySelector('.signOut').classList.add('right')

            timer = setTimeout(()=>{
                signIn.querySelector('.signIn').classList.remove('left')
                clearTimeout(timer)
            }, 70)
            
        }

    }, [currentUser])

    const value = {url, menuHandler}

    return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>


}