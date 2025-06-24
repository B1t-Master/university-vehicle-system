import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/core';
import CheckBox from '@react-native-community/checkbox';
import InputField from '../components/InputField';

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
        <Text style={[styles.headerTitle, { fontSize: 32 }]}>ADD VEHICLE</Text>
        <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>

        <InputField
          label="Vehicle Make (e.g., Toyota)"
          placeholder="Vehicle Make"
          value={vehicleMake}
          onChangeText={setVehicleMake}
        />

        <InputField
          label="Vehicle Model (e.g., Camry)"
          placeholder="Vehicle Model"
          value={vehicleModel}
          onChangeText={setVehicleModel}
        />

        <InputField
          label="Number Plate (e.g., KCA 123A)"
          placeholder="Number Plate"
          value={numberPlate}
          onChangeText={setNumberPlate}
        />

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Select Vehicle Type</Text>
          <Picker
            selectedValue={vehicleType}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setVehicleType(itemValue)
            }>
            <Picker.Item label="Car" value="car" />
            <Picker.Item label="Bike" value="bike" />
            <Picker.Item label="Van" value="van" />
            <Picker.Item label="Truck" value="truck" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
          {vehicleImage ? (
            <Image source={{ uri: vehicleImage }} style={styles.vehicleImage} />
          ) : (
            <TouchableOpacity onPress={pickImage} style={styles.headerButton}>
              <Text style={styles.headerButtonText}>
                Upload Image
              </Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>SUBMIT FOR APPROVAL</Text>
      </TouchableOpacity>
      <View style={{width: 10}} />
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
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
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 8,
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
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddVehicle;
