import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const VehicleCard = ({ item, status, onDelete, onDownload }) => {
  const handleDeletePress = () => {
    Alert.alert(
      "Delete Vehicle",
      "Are you sure you want to delete this vehicle?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: onDelete,
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.vehicleCard}>
      {item.imageBase64 ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${item.imageBase64}` }}
          style={styles.vehicleImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.noImage}>
          <Text style={styles.noImageText}>No Image</Text>
        </View>
      )}
      <View style={styles.vehicleInfo}>
        <View style={styles.headerRow}>
          <View style={styles.statusContainer}>
            <Text
              style={[
                styles.statusText,
                status === "approved"
                  ? styles.approvedStatus
                  : styles.pendingStatus,
              ]}
            >
              {status.toUpperCase()}
            </Text>
          </View>
          <View style={styles.actionsContainer}>
            {status === "approved" && onDownload && (
              <TouchableOpacity
                onPress={onDownload}
                style={styles.downloadButton}
              >
                <MaterialIcons name="file-download" size={20} color="#0782F9" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleDeletePress}
              style={styles.deleteButton}
            >
              <MaterialIcons name="delete" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.vehicleMakeModel}>
          {item.vehicleMake} {item.vehicleModel}
        </Text>
        <Text style={styles.vehiclePlate}>{item.numberPlate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  vehicleCard: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  vehicleImage: {
    width: "100%",
    height: 160,
  },
  noImage: {
    width: "100%",
    height: 160,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#666",
    fontSize: 16,
  },
  vehicleInfo: {
    padding: 15,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statusContainer: {
    // Removed alignSelf: "flex-start" as it's now handled by headerRow
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: "hidden",
  },
  approvedStatus: {
    backgroundColor: "#e6f7ee",
    color: "#00a854",
  },
  pendingStatus: {
    backgroundColor: "#fff7e6",
    color: "#fa8c16",
  },
  vehicleMakeModel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  vehiclePlate: {
    fontSize: 16,
    color: "#666",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 6,
    borderRadius: 4,
  },
  downloadButton: {
    backgroundColor: "#e6f7ff",
    padding: 6,
    borderRadius: 4,
  },
});

export default VehicleCard;
