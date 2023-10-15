


import './file.css'




function ButtonComponent(props){
  
    
    

const {buttonType, type, text, onClick, link} = props
 

return(<button onClick={onClick} 
    className={`button ${buttonType}`} type={type}>{text}</button>)
   
    
}

export default ButtonComponent