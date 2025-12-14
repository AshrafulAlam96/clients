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
import app from "../firebase/firebase.init";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const API = import.meta.env.VITE_API_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  /* REGISTER */
  const registerUser = async (email, password, name, photoURL) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name, photoURL });

    // Sync to MongoDB
    await axios.post(`${API}/users`, {
      name,
      email,
      role: "student"
    });

    return result;
  };

  /* LOGIN */
  const signInUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  /* GOOGLE LOGIN */
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Sync user to DB (if not exists)
    await axios.post(`${API}/users`, {
      name: result.user.displayName,
      email: result.user.email,
      role: "student"
    });

    return result;
  };

  /* LOGOUT */
  const logOut = () => signOut(auth);

  /* 🔑 AUTH STATE OBSERVER */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const res = await axios.get(
            `${API}/users/role/${currentUser.email}`
          );
          setRole(res.data.role);
        } catch {
          setRole("student");
        }
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    role,
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
