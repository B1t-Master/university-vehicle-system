import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const addIcon = require("../assets/add.png");
const vehiclesIcon = require("../assets/car.png");
const requestsIcon = require("../assets/request.png");
const stickersIcon = require("../assets/sticker.png");

const Dashboard = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userDocRef = doc(getFirestore(), "users", auth.currentUser.uid);
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

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome {auth.currentUser?.email.split("@")[0]}
        </Text>
      </View>
      <View style={styles.actionCenter}>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.squareButton}
            onPress={() => navigation.navigate("AddVehicle")}
          >
            <Image
              source={addIcon}
              style={styles.actionIcon}
              resizeMode="contain"
            />
            <Text style={styles.squareButtonText}>ADD</Text>
            <Text style={styles.squareButtonText}>VEHICLE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.squareButton}
            onPress={() => navigation.navigate("MyVehicles")}
          >
            <Image
              source={vehiclesIcon}
              style={styles.actionIcon}
              resizeMode="contain"
            />
            <Text style={styles.squareButtonText}>MY</Text>
            <Text style={styles.squareButtonText}>VEHICLES</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.squareButton}>
            <Image
              source={requestsIcon}
              style={styles.actionIcon}
              resizeMode="contain"
            />
            <Text style={styles.squareButtonText}>REQUESTS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.squareButton}>
            <Image
              source={stickersIcon}
              style={styles.actionIcon}
              resizeMode="contain"
            />
            <Text style={styles.squareButtonText}>PROFILE</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>SETTINGS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleSignOut}>
          <Text style={styles.footerButtonText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    marginTop: 20,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  actionCenter: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    // gap: 40,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 20,
  },
  squareButton: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
  },
  actionIcon: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  squareButtonText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  footerButtonText: {
    color: "#0782F9",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Dashboard;
