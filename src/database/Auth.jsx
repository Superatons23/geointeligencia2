import React, {useEffect,useState} from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext=React.createContext();

export const AuthProvider =({children})=>{
const [currentUser,setCurrentUser]=useState(null)
const [loading,setLoading]=useState(true)

useEffect(()=>{
    console.log("usee effect")
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log("signed in")
          setCurrentUser(user)
         setLoading(false)
        } else {
          // User is signed out
          // ...
          setCurrentUser(user)
         setLoading(false)
          console.log("signed out")
        }
      });
  
},[])


return(

<AuthContext.Provider
value={{currentUser}}>
    {console.log("Auth")}
    {console.log(currentUser)}
{!loading && children}
</AuthContext.Provider>
)
}
export const useAuthState = () => {
    const auth = React.useContext(AuthContext)
  
    return { ...auth, currentUser:auth.currentUser != null }
  }