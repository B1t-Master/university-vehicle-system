import { auth, setDoc, doc, db, getDoc } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const handleAuthentication = async (authType, email, password) => {
  try {
    const userCredential = await authType(auth, email, password);
    if (authType === createUserWithEmailAndPassword) {
      await sendEmailVerification(userCredential.user);
    } else {
      if (!userCredential.user.emailVerified) {
        return;
      }
    }
  } catch (error) {
    alert("Authentication failed: " + error.message);
  }
};

const handleRegister = (email, password) => {
  handleAuthentication(createUserWithEmailAndPassword, email, password);
};

const handleSignIn = (email, password) => {
  handleAuthentication(signInWithEmailAndPassword, email, password);
};

export { handleSignIn, handleRegister };
