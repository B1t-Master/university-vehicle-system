import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Dashboard = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

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
      <View style={[styles.topBar]}>
        <TouchableOpacity
          style={[styles.button, styles.signOut]}
          onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>
        Welcome {auth.currentUser?.email.split("@")[0]}
      </Text>
      {/* {user && (
        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>{user.email}</Text>
        </View>
      )} */}
      <TouchableOpacity
        style={[styles.button, styles.addVehicle]}
        onPress={() => navigation.navigate("AddVehicle")}
      >
        <Text style={styles.buttonText}>Add Vehicle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    // flex: 1,
    justifyContent: "centre",
    // alignItems: "centre",
    padding: 20,
    // margin: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "10",
  },
  profileContainer: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0782F9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  signOut: {
    alignSelf: "flex-end",
  },
  addVehicle: {
    alignSelf: "centre",
    marginTop: "40",
  },
});

export default Dashboard;
