import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import {
  db,
  collection,
  onSnapshot,
  query,
  where,
  doc,
  deleteDoc,
} from "../firebase";
import VehicleCard from "../components/VehicleCard";

const Vehicles = () => {
  const navigation = useNavigation();
  const [vehicles, setVehicles] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const handleDeleteVehicle = async (vehicleId) => {
    const user = auth.currentUser;
    if (user) {
      try {
        await deleteDoc(doc(db, "users", user.uid, "vehicles", vehicleId));
      } catch (error) {
        console.error("Error deleting vehicle: ", error);
      }
    }
  };
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      let q;
      if (activeTab === "all") {
        q = query(
          collection(db, "users", user.uid, "vehicles"),
          where("status", "in", ["approved", "pending"])
        );
      } else {
        q = query(
          collection(db, "users", user.uid, "vehicles"),
          where("status", "==", activeTab)
        );
      }

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
  }, [activeTab]);

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (activeTab === "all") return true;
    return vehicle.status === activeTab;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MY VEHICLES</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddVehicle")}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Status Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "all" && styles.activeTab]}
          onPress={() => setActiveTab("all")}
        >
          <Text style={styles.tabText}>ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "approved" && styles.activeTab]}
          onPress={() => setActiveTab("approved")}
        >
          <Text style={styles.tabText}>APPROVED</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "pending" && styles.activeTab]}
          onPress={() => setActiveTab("pending")}
        >
          <Text style={styles.tabText}>PENDING</Text>
        </TouchableOpacity>
      </View>

      {filteredVehicles.length > 0 ? (
        <FlatList
          data={filteredVehicles}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <VehicleCard
              item={item}
              status={item.status}
              onDelete={() => handleDeleteVehicle(item.id)}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            {activeTab === "approved"
              ? "No approved vehicles"
              : activeTab === "pending"
              ? "No pending vehicles"
              : "No vehicles added yet"}
          </Text>
          <TouchableOpacity
            style={styles.addVehicleButton}
            onPress={() => navigation.navigate("AddVehicle")}
          >
            <Text style={styles.addVehicleButtonText}>ADD VEHICLE</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#0782F9",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontWeight: "bold",
    color: "#333",
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  addVehicleButton: {
    backgroundColor: "#0782F9",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addVehicleButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Vehicles;
