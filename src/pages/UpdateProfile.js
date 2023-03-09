
import React, { useRef, useState} from "react"
import { useAuth } from "../contexts/AuthContext"
import Header from "../components/Header"
import { Link,useNavigate } from "react-router-dom"

export default function UpdateProfile() {
        const emailRef = useRef()
        const [darkMode, setDarkMode] = useState(false);
        const passwordRef = useRef()
        const passwordConfirmRef = useRef()
        const {currentUser, updatePassword, updateEmail} = useAuth()
        const [error, setError] = useState("")
        const [loading, setLoading] = useState(false)
        const navigate= useNavigate()
        async function handleSubmit(e) {
            e.preventDefault()
            if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                return setError("Passwords do not match")
              }
            
              const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        navigate.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
          }
    
          return (           
      <div>
        <div className="signup">
        {error && <span className="spanC">{error}</span>}
          <form className="formC"  onSubmit={handleSubmit}>
          <h2>Update Profile</h2>
    
            <input className="inputC"
              type="email"
              placeholder="email" ref={emailRef} required 
            />
    
            <input className="inputC"
              type="password"
              placeholder="Password" ref={passwordRef} required
            />
    
            <input className="inputC"
              type="password"
              placeholder="Confirm Password" ref={passwordConfirmRef} required
            />
            <button   className='save' disabled={loading} type="submit">Update Profile</button>
          </form>
          <h4>
    Already have an account? <Link to="/login"> Log In</Link>
    </h4>
        </div>
        
        </div>
            
          )
    }
    