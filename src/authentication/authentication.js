import { auth, database } from "../firebase";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";

const handleAuthentication = async (authType, email, password, username) => {
  try {
    const userCredential = await authType(auth, email, password);
    if (authType === createUserWithEmailAndPassword) {
      await updateProfile(userCredential.user, {
        displayName: username
      });
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
