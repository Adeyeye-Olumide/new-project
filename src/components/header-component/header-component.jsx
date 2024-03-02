import { Link, Outlet } from "react-router-dom"


import {  useContext } from "react"
import { HeaderContext, } from "../../contexts/header-context"



import { signUserOut } from "../../utils/firestore"



import './file.scss'
import SideBar from "../sidebar-component/sidebar-component"
import PopUp from "../pop-up-component/pop-up-component"
import { UserContext } from "../../contexts/user-context"
import FooterComponent from "../footer-component/footer-component"




function Header(){

    const  {menuHandler} = useContext(HeaderContext)
    const {currentUser} = useContext(UserContext)
   

    

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
            
            <header className="header-container component"  onClick={menuHandler}>
                <SideBar></SideBar>
          
                <div className="links-header" >
                    <div className="sub-header">

                        <div className="dropdown1">
                            <div className="home-link">
                                <Link to="/"><h6 className="home" id="1">HOME</h6></Link>

                                
                            
                            </div>

                            {/* <div className="dropdown-content">

                                
                                <Link><h6>MY ACCOUNT</h6></Link>
                                    
                                
                            </div> */}

                            
                            
                        </div>

                        <div>
                            <Link to="resort"><h6 className="resort" id="2">OUR RESORTS</h6></Link>
                        </div>

                        <div>
                            <Link to="gallery"><h6  className="gallery">GALLERY</h6></Link>
                        </div>

                        <div>
                            <a href="#contact"><h6 className="contact">CONTACT US</h6></a>
                            {/* <Link to="#contact"><h6 className="contact">CONTACT US</h6></Link> */}
                        </div>

                        <div className="authentication-links-container">
                            {
                                !currentUser?
                                <Link to='authentication' className="none"><h6>SIGN IN</h6></Link>:
                                <Link to=''><h6 onClick={signUserOut}>SIGN OUT</h6></Link>
                                
                            }
                            
                                
                                
        
                        </div>


                    </div>


                    <div className='dropdowns'>
                        <div className="drop" id="1">
                            <h6 className="account" id='1'>MY ACCOUNT</h6>
                        </div>

                        {/* <div className='drop second'  id='2'>
                            <h6 >AURORA</h6>
                            <h6>LO</h6>
                            <h6>GANYMEDE</h6>
                        </div> */}

                    </div>
                    

                </div>

                <div className="logo">
                    <h1>SH</h1>
                </div>

                


               
            </header>
            
            <PopUp></PopUp>
            <Outlet></Outlet>
            <FooterComponent></FooterComponent>
        </main>
    )
}

export default Header