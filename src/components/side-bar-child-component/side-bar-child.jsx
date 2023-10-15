

import { useContext, useEffect } from 'react'

import { UserContext } from '../../contexts/user-context'


function SideBarChild(){

    const {currentUser} = useContext(UserContext)
    let displayName, email

    if(currentUser){
        displayName = currentUser.displayName
        email = currentUser.email
    }


    return (
        <>
            <div className="user-info">
                <h4>Welcome {displayName? displayName: "Guest"}</h4>
                <h6> {email? email: 'Kindly Sign In'}</h6>
            </div>

            <div className="others">
                <h6>
                    Reviews
                </h6>
                <h6>
                    My Bookings
                </h6>
            </div>
        </>
        

    )
}

export default SideBarChild