import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../firebase";
import { useNavigation } from '@react-navigation/native';

const db = getFirestore();

const MyVehicles = () => {
  const navigation = useNavigation();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehiclesRef = collection(db, "vehicles");
        const q = query(vehiclesRef, where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const vehiclesList = [];
        querySnapshot.forEach((doc) => {
          vehiclesList.push({ id: doc.id, ...doc.data() });
        });
        setVehicles(vehiclesList);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const renderVehicleItem = ({ item }) => (
    <View style={styles.vehicleItem}>
      <Image
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/50' }} // Placeholder image
        style={styles.vehicleImage}
      />
      <View style={styles.vehicleDetails}>
        <Text style={styles.vehicleMakeModel}>{item.make} {item.model}</Text>
        <Text style={styles.vehicleNumberPlate}>{item.numberPlate}</Text>
        <Text style={styles.vehicleStatus}>Status: {item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.myVehiclesText}>My Vehicles</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortButtonText}>Sort</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={vehicles}
        renderItem={renderVehicleItem}
        keyExtractor={(item) => item.id}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  myVehiclesText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sortButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  sortButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vehicleItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  vehicleImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  vehicleDetails: {
    flex: 1,
  },
  vehicleMakeModel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vehicleNumberPlate: {
    fontSize: 14,
  },
  vehicleStatus: {
    fontSize: 14,
    color: 'gray',
  },
});

export default MyVehicles;