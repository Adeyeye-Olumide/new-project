


import './file.css'




function ButtonComponent(props){
    
        
        

    const {buttonType, type, text, onClick, link, disabled} = props
    

    return(<button onClick={onClick} 
        className={`button ${buttonType}`} type={type} disabled={disabled}>{text}</button>)
    
    
}

export default ButtonComponent