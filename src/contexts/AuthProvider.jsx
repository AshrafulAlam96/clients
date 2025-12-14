import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "firebase/auth";
import axios from "axios";
import { auth } from "../firebase/firebase.init";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ REGISTER
  const registerUser = async (email, password, name, photoURL) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, {
        displayName: name,
        photoURL
      });

      // Sync to MongoDB ONLY if Firebase success
      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name,
        email,
        role: "student"
      });

      return result;
    } catch (error) {
      throw error; // pass error to UI
    }
  };

  // ✅ LOGIN
  const signInUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // ✅ GOOGLE LOGIN
  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);

    // MongoDB sync (safe: backend prevents duplicate)
    await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
      name: result.user.displayName,
      email: result.user.email,
      role: "student"
    });

    return result;
  };

  const logOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    googleLogin,
    logOut
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
