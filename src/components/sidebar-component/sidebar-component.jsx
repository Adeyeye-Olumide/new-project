import { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/user-context'
import SideBarChild from '../side-bar-child-component/side-bar-child'
import Spinner from '../spinner-component/spinner-component'
import './file.scss'

function SideBar(){
    const {currentUser, isLoaded} = useContext(UserContext)


    useEffect(()=> {
        const element = document.querySelector('.header-container')
    
        const dropDownContent = element.querySelector(".dropdown-content")

        const sideBar = element.querySelector('.side-bar-container')

        const revealSideBar = ()=> {
            sideBar?.classList.toggle('active')
        }


      

        dropDownContent.addEventListener("click", revealSideBar)

        return ()=> dropDownContent.removeEventListener("click", revealSideBar)
            
        
        

    },[currentUser])

   
    return (
        
        
        <div className='side-bar-container'>
                {!isLoaded? <Spinner></Spinner>: <SideBarChild></SideBarChild>}
            
        </div>
        
    )
}


export default SideBar