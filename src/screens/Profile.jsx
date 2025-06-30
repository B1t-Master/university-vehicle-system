import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import { auth } from '../firebase';
import { getFirestore, doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";

const Profile = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [vehicleCount, setVehicleCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(getFirestore(), "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name);
          setUserEmail(auth.currentUser.email);
        } else {
          setUserName("User");
          setUserEmail('');
        }

        // Fetch vehicle count
        const vehiclesCollection = collection(getFirestore(), "vehicles");
        const q = query(vehiclesCollection, where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        setVehicleCount(querySnapshot.size);

      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserName("User");
        setUserEmail('');
        setVehicleCount(0);
      }
    };

    fetchUserData();
  }, []);

  const getNameFromEmail = (email) => {
    return email.split('@')[0];
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>USER PROFILE</Text>
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Dashboard")}>
          <Text style={styles.navButtonText}>BACK</Text>
        </TouchableOpacity>
        <Text style={styles.profileText}>PROFILE</Text>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("EditProfile")}>
          <Text style={styles.navButtonText}>EDIT</Text>
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <Text style={styles.name}>{getNameFromEmail(userEmail)}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>EMAIL:</Text>
        <Text style={styles.infoText}>{userEmail}</Text>
        <Text style={styles.infoLabel}>VEHICLES:</Text>
        <Text style={styles.infoText}>{vehicleCount}</Text>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditProfile")}>
        <Text style={styles.editButtonText}>EDIT PROFILE</Text>
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
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0782F9',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  navButtonText: {
    fontSize: 16,
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#0782F9',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;