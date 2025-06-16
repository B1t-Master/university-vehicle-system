import { auth } from "../firebase";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const handleAuthentication = async (authType, email, password) => {
  try {
    const user = await authType(auth, email, password);
    alert("Authentication successful: " + user.user.email);
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
