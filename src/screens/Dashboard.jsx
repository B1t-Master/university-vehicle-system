import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { db, collection, onSnapshot } from "../firebase";
import { auth } from "../firebase";

const Dashboard = () => {
  const navigation = useNavigation();
  // const [user, setUser] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("login");
      })
      .catch((error) => alert(error.message));
  };
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const vehiclesRef = collection(db, "users", user.uid, "vehicles");

      const unsubscribe = onSnapshot(vehiclesRef, (querySnapshot) => {
        const loadedVehicles = [];
        querySnapshot.forEach((doc) => {
          loadedVehicles.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setVehicles(loadedVehicles);
      });

      return () => unsubscribe();
    }
  }, []);
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
      <FlatList
        styles={styles.listContainer}
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContent}>
            {item.imageBase64 ? (
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.imageBase64}` }}
                style={styles.cardImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.noImage}>
                <Text style={styles.noImageText}>No Image</Text>
              </View>
            )}
            <Text style={styles.cardTitle}>
              {item.vehicleMake}
              {item.vehicleModel}
            </Text>
            <View style={styles.cardDetails}>
              {/* <Text style={styles.cardText}>Year: {item.year}</Text> */}
              <Text style={styles.cardText}>Plate: {item.numberPlate}</Text>
            </View>
          </View>
        )}
      />
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
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 180,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardText: {
    fontSize: 16,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 50,
  },
});

export default Dashboard;
