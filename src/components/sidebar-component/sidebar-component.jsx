import { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/user-context'
import SideBarChild from '../side-bar-child-component/side-bar-child'
import { useSelector } from "react-redux"

import './file.scss'

function SideBar(){
    const currentUser = useSelector((state)=> state.currentUser)


    useEffect(()=> {
        const element = document.querySelector('.header-container')
    
        const myAccount = element.querySelector(".account")

        const sideBar = element.querySelector('.side-bar-container')

        const revealSideBar = ()=> {
            sideBar?.classList.toggle('active')
        }

        const windowHandler = (e) => {
            if (e.target.classList.contains('account') || e.target.closest('.side-bar-container')) return 
            sideBar.classList.remove('active')
           
        }


      

        myAccount.addEventListener("click", revealSideBar)
        window.addEventListener("click", windowHandler)

        return ()=> {
            
            myAccount.removeEventListener("click", revealSideBar)
            window.removeEventListener("click", windowHandler)
    
        }
            
        
        

    },[currentUser])

   
    return (
        
        
        <div className='side-bar-container component'>
            <SideBarChild></SideBarChild>
            
        </div>
        
    )
}


export default SideBar