import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { auth } from '../firebase';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const EditProfile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(getFirestore(), "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name);
          setEmail(auth.currentUser.email);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const userDocRef = doc(getFirestore(), "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        name: name,
      });
      navigation.goBack(); // Navigate back to Profile screen after saving
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Edit Profile</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          editable={false} // Email is not editable
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#0782F9',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfile;