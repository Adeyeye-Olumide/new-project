
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { HeaderContext } from '../../contexts/header-context'
import './file.scss'

function PopUp(){

    const message = useSelector((state)=> state.header.message)

    // const {message} = useContext(HeaderContext)


    return (
        <div className='popup-container hidePopUp'>
            <div className='top'>
                <span>&times;</span>

            </div>
            <div className='message'>
                <h3>
                    {message}
                </h3>

            </div>
        </div>
    )
}

export default PopUp