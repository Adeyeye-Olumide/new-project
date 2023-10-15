

import ButtonComponent from "../button-component/button-component"
import './file.css'
function SignIn(props){
    const {onChange, onSubmit, onClick} = props
    return (
        <form className='first-form' onChange={onChange} onSubmit={onSubmit}>
                <div className='heading'>
                    <h2>I already have an account</h2>
                    <p>Sign in with your email and password</p>
                </div>
                <div className='other'>
                    <div>
                        <input  type="email" name="email" id="email" required/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div>
                        
                        <input type="password" name="password" id="password"  required/>
                        <label htmlFor="password">Password</label>

                    </div>

                </div>
                
                <div className='buttons'>
                    <ButtonComponent buttonType="plain" text="SIGN IN" type="submit"></ButtonComponent>
                    <ButtonComponent buttonType="google" text="SIGN IN WITH GOOGLE" onClick={onClick}></ButtonComponent>
                </div>
        </form>

    )
}

export default SignIn
