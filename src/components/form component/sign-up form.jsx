import ButtonComponent from "../button-component/button-component"

function SignUp(props){
    const {onSubmit, onChange} = props

    return (
        <form className='second-form' onSubmit={onSubmit} onChange={onChange}>
        <div className='heading'>
            <h2>I do not have an account</h2>
            <p>Sign in with your email and password</p>
        </div>
        <div className='other'>
            <div>
                <input type="text" name="displayName" id="displayName" required/>
                <label htmlFor="displayName">Display name</label>
            </div>
            <div>
                <input type="email" name="email" id="email" required/>
                <label htmlFor="email">Email</label>
            </div>
            <div>
                
                <input type="password" name="password" id="password"  required/>
                <label htmlFor="password">Password</label>

            </div>
            <div>
                
                <input type="password" name="confirmPassword"  id="confirm-password"  required/>
                <label htmlFor="confirm-password">Confirm Password</label>

            </div>
        </div>
        
        <div className='buttons'>
           <ButtonComponent buttonType="plain" text="SIGN UP"></ButtonComponent>
        </div>
    </form>
    )
}

export default SignUp

       