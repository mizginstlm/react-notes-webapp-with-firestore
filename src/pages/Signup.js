import React, { useRef, useState} from "react"
import { useAuth } from "../contexts/AuthContext"
import "./signup.css" 
import { updateProfile } from "firebase/auth";
import { doc,setDoc,getFirestore,addDoc, collection, query, where, getDocs } from "firebase/firestore";

import { Link,useNavigate } from "react-router-dom"
import { db } from "../firebase"
const  Signup = ()=> {
    const emailRef = useRef()
    const displayNameRef = useRef()
    const [darkMode, setDarkMode] = useState(false);
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate= useNavigate()
    const [email,setEmail] = useState();
    const [password,setPassword] = useState('');
    const [displayName,setDisplayname] = useState('');
    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match")//we use return to go out of function when this happen.
        }
        try {
          setError("")
          setLoading(true)
          const res = await  signup(email, password);

          await updateProfile(res.user, {
            displayName,
            email,

            
          });
          
          const userRef = doc(db, "users",res.user.uid);
          await setDoc(userRef, {
            uid: res.user.uid,
            displayName,
            email,
          });
       
          navigate("/home");
        }catch (error){
          console.log(error)
        }
        setLoading(false)
      }

      return (
  <div>
    <div className="signup">
   
    {error && <span className="spanC">{error}</span>}
      <form className="formC"  onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <input className="inputC"
          type="text"
          placeholder="display name" onChange={(e) => setDisplayname(e.target.value)} ref={displayNameRef} required 
        />
        <input className="inputC"
          type="email"
          placeholder="email" onChange={(e) => setEmail(e.target.value)} ref={emailRef} required 
        />

        <input className="inputC"
          type="password"
          placeholder="password" onChange={(e) => setPassword(e.target.value)} ref={passwordRef} required
        />

        <input className="inputC"
          type="password"
          placeholder="password" ref={passwordConfirmRef} required
        />
        <button   className='save' disabled={loading} type="submit">Sign Up</button>
      </form>
      <h4>
    Already have an account? <Link to="/login"> Log In</Link>
    </h4>
    </div>
    
    </div>
        
      )
}

export default Signup;