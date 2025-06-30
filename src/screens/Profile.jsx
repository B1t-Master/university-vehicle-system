import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>USER PROFILE</Text>
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>BACK</Text>
        </TouchableOpacity>
        <Text style={styles.profileText}>PROFILE</Text>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>EDIT</Text>
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <Text style={styles.name}>John Doe</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>EMAIL:</Text>
        <Text style={styles.infoText}>john.doe@email.com</Text>
        <Text style={styles.infoLabel}>PHONE:</Text>
        <Text style={styles.infoText}>+254 123 456 789</Text>
        <Text style={styles.infoLabel}>VEHICLES:</Text>
        <Text style={styles.infoText}>3</Text>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>EDIT PROFILE</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  navButtonText: {
    fontSize: 16,
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;