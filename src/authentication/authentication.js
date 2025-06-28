import { auth } from "../firebase";
import { useState } from "react";
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

import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();

const isAdmin = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.role === "admin";
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

const assignAdminRole = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, { role: "admin" });
    console.log(`Admin role assigned to user with UID: ${uid}`);
  } catch (error) {
    console.error("Error assigning admin role:", error);
  }
};

export { handleSignIn, handleRegister, isAdmin, assignAdminRole };
