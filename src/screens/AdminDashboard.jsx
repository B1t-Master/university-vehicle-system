import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  getFirestore,
  collectionGroup,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../firebase";

const AdminDashboard = () => {
  const navigation = useNavigation();
  const [stats, setStats] = useState({
    totalUsers: 3,
    totalVehicles: 0,
    pendingVehicles: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // const  db= getFirestore();

        const usersCount = await getCountFromServer(collection(db, "users"));
        const totalUsers = usersCount.data().count;
        console.log(usersCount);
        const allVehiclesQuery = collectionGroup(db, "vehicles");
        const vehiclesSnapshot = await getDocs(allVehiclesQuery);
        const totalVehicles = vehiclesSnapshot.size;
        const pendingQuery = query(
          collectionGroup(db, "vehicles"),
          where("status", "==", "pending")
        );
        const pendingSnapshot = await getDocs(pendingQuery);
        const pendingVehicles = pendingSnapshot.size;

        setStats({
          totalUsers,
          totalVehicles,
          pendingVehicles,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.adminPanelText}>ADMIN PANEL</Text>
      </View>
      <View style={styles.actionCenter}>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.squareButton}
            onPress={() => navigation.navigate("Approvals")}
          >
            <Text style={styles.squareButtonText}>APPROVALS</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.squareButton}>
            <Text style={styles.squareButtonText}>USERS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.squareButton}>
            <Text style={styles.squareButtonText}>ALL VEHICLES</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.squareButton}>
            <Text style={styles.squareButtonText}>REPORTS</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.quickStatsContainer}>
        <Text style={styles.quickStatsTitle}>QUICK STATS</Text>
        <View style={styles.statsItem}>
          <Text style={styles.statsLabel}>Total Users:</Text>
          <Text style={styles.statsValue}>{stats.totalUsers}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsLabel}>Total Vehicles:</Text>
          <Text style={styles.statsValue}>{stats.totalVehicles}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsLabel}>Pending Approvals:</Text>
          <Text style={styles.statsValue}>{stats.pendingVehicles}</Text>
        </View>
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
  adminPanelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  actionCenter: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    marginLeft: -10,
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
  quickStatsContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: -30,
  },
  quickStatsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  statsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statsLabel: {
    fontSize: 16,
    color: "#666",
  },
  statsValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default AdminDashboard;
