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
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;

  /* ---------------- AUTH METHODS ---------------- */

  const signInUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const registerUser = async (email, password, name, photo) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, {
      displayName: name,
      photoURL: photo
    });

    // save user to DB
    await axios.post(`${API}/users`, {
      name,
      email,
      role: "student"
    });

    return res;
  };

  const googleLogin = async () => {
    const res = await signInWithPopup(auth, googleProvider);

    // sync with DB
    await axios.post(`${API}/users`, {
      name: res.user.displayName,
      email: res.user.email,
      role: "student"
    });

    return res;
  };

  const logOut = () => signOut(auth);

  /* ---------------- AUTH STATE OBSERVER ---------------- */

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
  }, [API]);

  const value = {
    user,
    role,
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
