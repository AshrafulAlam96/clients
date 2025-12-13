import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import auth from "../firebase/firebase.init";

export const AuthContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // REGISTER
  // =========================
  const registerUser = async (email, password, name) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(result.user, {
      displayName: name,
    });

    // Sync user to MongoDB
    await axios.post(`${API_BASE_URL}/users`, {
      name,
      email,
    });

    return result;
  };

  // =========================
  // LOGIN
  // =========================
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // =========================
  // LOGOUT
  // =========================
  const logOut = async () => {
    localStorage.removeItem("token");
    setUser(null);
    return signOut(auth);
  };

  // =========================
  // AUTH STATE OBSERVER
  // =========================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        try {
          // 🔐 Get JWT
          const jwtRes = await axios.post(`${API_BASE_URL}/users/jwt`, {
            email: currentUser.email,
          });

          localStorage.setItem("token", jwtRes.data.token);

          // 🎭 Get Role
          const roleRes = await axios.get(
            `${API_BASE_URL}/users/role/${currentUser.email}`
          );

          setUser({
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            role: roleRes.data.role,
          });
        } catch (error) {
          console.error("Auth sync failed:", error);
          setUser(null);
        }
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
