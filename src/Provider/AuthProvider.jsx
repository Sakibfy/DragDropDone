
import { createContext, useEffect, useState } from "react";
import {  getAuth, GoogleAuthProvider, onAuthStateChanged,  signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/Firebase";





export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
  }

  const updateUserProfile = (name,photo) => {
   return updateProfile(auth.currentUser, {
  displayName: name, photoURL: photo
})
  }

  const googleSingIn = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }
    
  useEffect(() => {
  const unsubscribe =  onAuthStateChanged(auth, currentUser => {
    setUser(currentUser);

    //get jwt token
    // if (currentUser) {
  
    //   // get token and store client
    //   const userInfo = { email: currentUser.email };
    //   axiosPublic.post('/jwt', userInfo)
    //     .then(res => {
    //       if (res.data.token) {
    //         localStorage.setItem('access-token', res.data.token);
    //         setLoading(false)
    //     }
    //   })
    // } else {
    //   localStorage.removeItem('access-token');
    //   setLoading(false)
    //   }
      
  }
  )
    return () => {
      return unsubscribe();
    }
},[])


  const authInfo = {
    user,
    loading,
    logOut,
    updateUserProfile,
    googleSingIn,
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;