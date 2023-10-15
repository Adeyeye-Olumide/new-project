
import { useContext } from "react"
import { RoomContext } from "../../contexts/room-context"
import ButtonComponent from "../button-component/button-component"

import './file.scss'

function RoomComponent(){

    const {roomData} = useContext(RoomContext)

    return(
        
        <div className="room-container">
            {
                roomData.map(({name, description, id, imageUrl, price})=>{
                    return (
                        <div key={id} className='room-details'>
                            <img src={imageUrl} alt={name} width='500px' height='300px'/>
                            <div>
                                <h1>{name}</h1>
                                <h6>{description}</h6>
                                <h6>Price: {price} USD</h6>
                                <ButtonComponent text='BOOK NOW' type="plain"></ButtonComponent>
                            </div>
                            
                        </div>
                    )
                })
            }

        </div>
    )

}

export default RoomComponent