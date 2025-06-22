import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const AddVehicle = () => {
  const navigation = useNavigation();
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [numberPlate, setNumberPlate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleImage, setVehicleImage] = useState(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log('Vehicle Make:', vehicleMake);
    console.log('Vehicle Model:', vehicleModel);
    console.log('Number Plate:', numberPlate);
    console.log('Vehicle Type:', vehicleType);
    console.log('Vehicle Image:', vehicleImage);
    alert('Vehicle data saved (check console)');
  };

  const handleSubmit = () => {
    // Implement submit for approval functionality here
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setVehicleImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: 32 }]}>ADD A VEHICLE</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Vehicle Make (e.g., Toyota)</Text>
          <TextInput
            style={styles.input}
            placeholder="Vehicle Make"
            value={vehicleMake}
            onChangeText={setVehicleMake}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Vehicle Model (e.g., Camry)</Text>
          <TextInput
            style={styles.input}
            placeholder="Vehicle Model"
            value={vehicleModel}
            onChangeText={setVehicleModel}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Number Plate (e.g., KCA 123A)</Text>
          <TextInput
            style={styles.input}
            placeholder="Number Plate"
            value={numberPlate}
            onChangeText={setNumberPlate}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Select Vehicle Type</Text>
          {/* Implement dropdown here */}
          <TextInput
            style={styles.input}
            placeholder="Vehicle Type"
            value={vehicleType}
            onChangeText={setVehicleType}
          />
          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
              {vehicleImage ? (
                <Image source={{ uri: vehicleImage }} style={styles.vehicleImage} />
              ) : (
                <Text style={styles.imagePlaceholderText}>
                  [CAMERA]\nUPLOAD VEHICLE\nIMAGE\nTap to select image
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>SUBMIT FOR APPROVAL</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddVehicle;