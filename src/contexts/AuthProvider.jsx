import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import axios from "axios";
import app from "../firebase/firebase.init";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;

  /* ============================
     AUTH METHODS
  ============================ */

  // Login
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Register (Email/Password)
  const registerUser = async (email, password, name, photo) => {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update Firebase profile
    await updateProfile(result.user, {
      displayName: name,
      photoURL: photo
    });

    // Sync user with MongoDB (ROLE DECIDED BY SERVER)
    await axios.post(`${API}/users`, {
      name,
      email
    });

    return result;
  };

  // Google Login
  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);

    // Sync user with MongoDB
    await axios.post(`${API}/users`, {
      name: result.user.displayName,
      email: result.user.email
    });

    return result;
  };

  // Logout
  const logOut = () => {
    setRole(null);
    return signOut(auth);
  };

  /* ============================
     AUTH STATE OBSERVER
  ============================ */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const res = await axios.get(
            `${API}/users/role/${currentUser.email}`
          );
          setRole(res.data.role);
        } catch (err) {
          console.error("Role fetch failed", err);
          setRole("student");
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [API]);

  /* ============================
     CONTEXT VALUE
  ============================ */
  const value = {
    user,
    role,          // "admin" | "moderator" | "student"
    loading,
    signInUser,
    registerUser,
    googleLogin,
    logOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
