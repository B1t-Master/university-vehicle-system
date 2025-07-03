import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/core";
import InputField from "../components/InputField";
import { db, collection, addDoc } from "../firebase";
import { auth } from "../firebase";

const AddVehicle = () => {
  const navigation = useNavigation();
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleImage, setVehicleImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [errors, setErrors] = useState({});

  const handleBack = () => {
    navigation.goBack();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!vehicleMake.trim()) {
      newErrors.vehicleMake = "Vehicle make is required";
    }

    if (!vehicleModel.trim()) {
      newErrors.vehicleModel = "Vehicle model is required";
    }

    if (!numberPlate.trim()) {
      newErrors.numberPlate = "Number plate is required";
    } else if (!/^[A-Z0-9\s]{3,10}$/i.test(numberPlate)) {
      newErrors.numberPlate = "Enter a valid number plate";
    }

    if (!vehicleType) {
      newErrors.vehicleType = "Please select vehicle type";
    }

    if (!vehicleImage) {
      newErrors.vehicleImage = "Vehicle image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddVehicle = async () => {
    if (!validateForm()) {
      return;
    }

    const user = auth.currentUser;
    if (user) {
      try {
        await addDoc(collection(db, "users", user.uid, "vehicles"), {
          vehicleMake: vehicleMake.trim(),
          vehicleModel: vehicleModel.trim(),
          vehicleType,
          vehicleImage,
          numberPlate: numberPlate.trim().toUpperCase(),
          imageBase64: imageBase64 || null,
          status: "pending",
          userEmail: user.email,
          createdAt: new Date(),
        });
        Alert.alert("Success", "Vehicle submitted for approval", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      } catch (error) {
        console.error("Error adding vehicle: ", error);
        Alert.alert("Error", "Failed to add vehicle. Please try again.");
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setImageBase64(result.assets[0].base64);
      setVehicleImage(result.assets[0].uri);
      setErrors({ ...errors, vehicleImage: null });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Your Vehicle</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.formContainer}>
        <InputField
          label="Vehicle Make (e.g., Toyota)"
          placeholder="Vehicle Make"
          value={vehicleMake}
          onChangeText={(text) => {
            setVehicleMake(text);
            setErrors({ ...errors, vehicleMake: null });
          }}
          error={errors.vehicleMake}
        />

        <InputField
          label="Vehicle Model (e.g., Camry)"
          placeholder="Vehicle Model"
          value={vehicleModel}
          onChangeText={(text) => {
            setVehicleModel(text);
            setErrors({ ...errors, vehicleModel: null });
          }}
          error={errors.vehicleModel}
        />

        <InputField
          label="Number Plate (e.g., KCA 123A)"
          placeholder="Number Plate"
          value={numberPlate}
          onChangeText={(text) => {
            setNumberPlate(text);
            setErrors({ ...errors, numberPlate: null });
          }}
          error={errors.numberPlate}
        />

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Select Vehicle Type</Text>
          <Picker
            selectedValue={vehicleType}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setVehicleType(itemValue);
              setErrors({ ...errors, vehicleType: null });
            }}
          >
            <Picker.Item label="Select vehicle type" value="" />
            <Picker.Item label="Car" value="car" />
            <Picker.Item label="Bike" value="bike" />
            <Picker.Item label="Van" value="van" />
            <Picker.Item label="Truck" value="truck" />
          </Picker>
          {errors.vehicleType && (
            <Text style={styles.errorText}>{errors.vehicleType}</Text>
          )}
        </View>

        <View>
          <Text style={styles.inputLabel}>Vehicle Image</Text>
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            {vehicleImage ? (
              <Image
                source={{ uri: vehicleImage }}
                style={styles.imagePreview}
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Image
                  source={require("../assets/icon.png")}
                  style={styles.uploadImageIcon}
                />
                <Text style={[styles.headerButtonText, styles.uploadImageText]}>
                  Upload Image
                </Text>
              </View>
            )}
          </TouchableOpacity>
          {errors.vehicleImage && (
            <Text style={styles.errorText}>{errors.vehicleImage}</Text>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleAddVehicle}>
        <Text style={styles.submitButtonText}>SUBMIT FOR APPROVAL</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  headerButton: {
    backgroundColor: "#0782F9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 80,
  },
  headerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  formContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500",
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: "#0782F9",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  uploadImageIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  uploadImageText: {
    color: "#0782F9",
    textAlign: "center",
  },
});

export default AddVehicle;
