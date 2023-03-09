import React, { useContext, useState, useEffect ,createContext} from "react"
import { auth } from "../firebase"

const AuthContext = createContext();
export default AuthContext;
export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    
    function login(email, password) {
      return auth.signInWithEmailAndPassword(email, password)
    }

    function signup(email, password) {
      return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
      return auth.signInWithEmailAndPassword(email, password)
    }

    function resetPassword(email, password) {
      return auth.sendPasswordResetEmail(email)
    }

    function logout(){
      return auth.signOut();
    }

    function updateEmail(email) {
      return currentUser.updateEmail(email)
    }
  
    function updatePassword(password) {
      return currentUser.updatePassword(password)
    }

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updatePassword,
    updateEmail,

}
return (
    <AuthContext.Provider  value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}