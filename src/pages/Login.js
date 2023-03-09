
import React, { useRef, useState ,useContext} from "react"
import { useAuth } from "../contexts/AuthContext"
import "./signup.css" 
import Header from "../components/Header"
import { Link ,useNavigate} from "react-router-dom"
import AuthContext from "../contexts/AuthContext";
const  Login = ()=>{
    const [error, setError] = useState("")
    const [darkMode, setDarkMode] = useState(false);
    const passwordRef = useRef()
    const {currentUser } = useContext(AuthContext);
    const emailRef = useRef()
    const { login} = useAuth()
    const navigate= useNavigate()
    const [email,setEmail] = useState();
    const [password,setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    async function handleSubmit (e){
        e.preventDefault()
        try {
          setError("")
          setLoading(true)
          await login(email, password);
          (navigate("/home"));
          console.log(currentUser)
        }catch {
          setError("Failed to Login")
          
        }
        setLoading(false)
      }

  return (
    <>     
    <div>
      <div className="signup">
      {error && <span className="spanC">{error}</span>}

        <form className="formC"  onSubmit={handleSubmit}>
        <h2>Log In</h2>
          <input className="inputC"
            type="email"
            placeholder="email" onChange={(e) => setEmail(e.target.value)} ref={emailRef} required 
          />
          <input className="inputC"
            type="password"
            placeholder="password"   onChange={(e) => setPassword(e.target.value)} ref={passwordRef} required
          />
          <button   disabled={loading} className='save' type="submit">Login</button>
        </form>
        <h4 ><Link to="/forgot-password">Forgot Password?</Link></h4>
        <h4>Don't have an account? <Link to="/signup">Sign up</Link></h4>
      </div>
      </div>
      </>
  )
}

export default Login;