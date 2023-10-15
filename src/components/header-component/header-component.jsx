import { Link, Outlet } from "react-router-dom"

import { useEffect, useContext } from "react"
import { HeaderContext, HeaderProvider } from "../../contexts/header-context"

import ButtonComponent from "../button-component/button-component"

import { signUserOut } from "../../utils/firestore"

import { useNavigate } from "react-router-dom"

import './file.scss'
import SideBar from "../sidebar-component/sidebar-component"
import { UserContext } from "../../contexts/user-context"


function Header(){

    const  {url, menuHandler} = useContext(HeaderContext)
   

    

    // function onClick(){
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

        
    // }

    

    

    


    return (
        <main>
            
            <header className="header-container"  onClick={menuHandler}>
                <SideBar></SideBar>
          
                <div className="links-header" >
                    <div className="dropdown1">
                        <div className="home-link">
                            <Link to="/"><h6 className="home">HOME</h6></Link>

                            
                        
                        </div>

                        <div className="dropdown-content">

                              
                            <Link><h6>MY ACCOUNT</h6></Link>
                                
                               
                        </div>

                        
                        
                    </div>

                    <div>
                        <Link to="resort"><h6 className="resort">OUR RESORTS</h6></Link>
                    </div>

                    <div>
                        <Link to="gallery"><h6  className="gallery">GALLERY</h6></Link>
                    </div>

                    <div>
                        <Link to="contact"><h6 className="contact">CONTACT US</h6></Link>
                    </div>

                    <div className="authentication-links-container">
                        <div className="signIn">
                           <Link to='authentication' className="none"><h6>SIGN IN</h6></Link>
                        </div>
                        
                        <div className="signOut right">
                           <Link to=''><h6 onClick={signUserOut}>SIGN OUT</h6></Link>
                        </div>
                            
                            
    
                    </div>
                </div>

                <div className="logo">
                    <h2>LOGO</h2>
                </div>

                


               
            </header>
            
            <Outlet></Outlet>
        </main>
    )
}

export default Header