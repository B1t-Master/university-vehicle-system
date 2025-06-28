import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const db = getFirestore();

const Dashboard = ({ navigation }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name);
        } else {
          setUserName('User');
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
        setUserName('User');
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userDashboardText}>USER DASHBOARD</Text>
      </View>
      <Text style={styles.greeting}>Good afternoon</Text>
      <Text style={styles.userName}>{userName}</Text>

      <View style={styles.entitiesContainer}>
        <TouchableOpacity style={styles.entityBox} onPress={() => navigation.navigate('MyVehicles')}>
          <Text style={styles.entityText}>My Vehicles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.entityBox} onPress={() => navigation.navigate('AddVehicle')}>
          <Text style={styles.entityText}>Add a Vehicle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.entityBox} onPress={() => navigation.navigate('Requests')}>
          <Text style={styles.entityText}>Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.entityBox} onPress={() => navigation.navigate('Stickers')}>
          <Text style={styles.entityText}>Stickers</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
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
  userDashboardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    marginBottom: 20,
  },
  entitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  entityBox: {
    width: '48%',
    height: 100,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  entityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dashboard;
