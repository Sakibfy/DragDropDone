
import { createContext, useEffect, useState } from "react";
import {   getAuth, GoogleAuthProvider, onAuthStateChanged,  signInWithPopup, signOut, updateProfile } from "firebase/auth";
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
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          userId: currentUser.uid,  // Unique Firebase User ID
          email: currentUser.email,
          displayName: currentUser.displayName,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);


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