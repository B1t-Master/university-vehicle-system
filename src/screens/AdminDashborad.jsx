import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import {
  db,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  collectionGroup,
} from "../firebase";

const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedTab, setSelectedTab] = useState("pending");

  useEffect(() => {
    const find = query(
      collectionGroup(db, "vehicles"),
      where("status", "==", selectedTab)
    );

    const unsubscribe = onSnapshot(
      find,
      (queryData) => {
        const vehiclesData = [];

        queryData.forEach((doc) => {
          const pathParts = doc.ref.path.split("/");
          const userId = pathParts[1]; // users/{userId}/vehicles/{vehicleId}
          vehiclesData.push({
            id: doc.id,
            userId: userId,
            ...doc.data(),
          });
        });

        setVehicles(vehiclesData);
        console.log(
          `Final result: ${vehiclesData.length} ${selectedTab} vehicles`
        );
      },
      (error) => {
        console.error("CollectionGroup query error:", error);
        Alert.alert("Error", "Failed to load vehicles: " + error.message);
      }
    );

    return () => unsubscribe();
  }, [selectedTab]);

  const handleApprove = async (userId, vehicleId) => {
    try {
      await updateDoc(doc(db, "users", userId, "vehicles", vehicleId), {
        status: "approved",
      });
      Alert.alert("Success", "Vehicle approved successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to approve vehicle");
      console.error(error);
    }
  };

  const handleReject = async (userId, vehicleId) => {
    try {
      await updateDoc(doc(db, "users", userId, "vehicles", vehicleId), {
        status: "rejected",
      });
      Alert.alert("Success", "Vehicle rejected");
    } catch (error) {
      Alert.alert("Error", "Failed to reject vehicle");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "pending" && styles.activeTab]}
          onPress={() => setSelectedTab("pending")}
        >
          <Text style={styles.tabText}>Pending ({vehicles.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "approved" && styles.activeTab]}
          onPress={() => setSelectedTab("approved")}
        >
          <Text style={styles.tabText}>Approved</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "rejected" && styles.activeTab]}
          onPress={() => setSelectedTab("rejected")}
        >
          <Text style={styles.tabText}>Rejected</Text>
        </TouchableOpacity>
      </View>

      {vehicles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No {selectedTab} vehicles found</Text>
        </View>
      ) : (
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.imageBase64 && (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${item.imageBase64}` }}
                  style={styles.image}
                />
              )}
              <Text style={styles.makeModel}>
                {item.vehicleMake} {item.vehicleModel}
              </Text>
              <Text style={styles.plate}>Plate: {item.numberPlate}</Text>
              <Text style={styles.user}>User: {item.userEmail}</Text>

              {item.status === "pending" && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.approveButton]}
                    onPress={() => handleApprove(item.userId, item.id)}
                  >
                    <Text style={styles.buttonText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.rejectButton]}
                    onPress={() => handleReject(item.userId, item.id)}
                  >
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              )}

              {item.status !== "pending" && (
                <Text style={styles.statusText}>
                  Status: {item.status} - {item.adminComments}
                </Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "space-around",
  },
  tab: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
  },
  activeTab: {
    backgroundColor: "#4a80f0",
  },
  tabText: {
    color: "#333",
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  makeModel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  plate: {
    fontSize: 16,
    marginBottom: 5,
  },
  user: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  approveButton: {
    backgroundColor: "#4CAF50",
  },
  rejectButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  statusText: {
    fontStyle: "italic",
    color: "#666",
  },
});

export default AdminDashboard;
