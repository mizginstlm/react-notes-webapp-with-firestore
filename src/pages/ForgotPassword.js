import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"

import { Link ,useNavigate} from "react-router-dom"

export default function ForgotPassword() {
        const [error, setError] = useState("")
      
        const emailRef = useRef()
        const { resetPassword} = useAuth()
        const navigate= useNavigate()
        const [message, setMessage] = useState('');

        async function handleSubmit (e){
            e.preventDefault()
            try {
              setError("")
              setMessage('')
              await  resetPassword(emailRef.current.value)
              setMessage("Check your inbox.")
            }catch {
              setError("Failed to send")
            }
          }
    
      return (
        <>     
        <div>
       
          <div className="signup">
          {error && <span className="spanC">{error}</span>}
    
            <form className="formC"  onSubmit={handleSubmit}>
            <h2>Forgot Password..</h2>
              <input className="inputC"
                type="email"
                placeholder="email" ref={emailRef} required 
              />
              <button  className='save' type="submit">Send</button>
            </form>
            <h4 >{message}</h4>
            <h4 ><Link to="/login">Login</Link></h4>
        <h4>Don't have an account? <Link to="/signup">Sign up</Link></h4>
          </div>
          
          </div>
          </>
      )
    }
    