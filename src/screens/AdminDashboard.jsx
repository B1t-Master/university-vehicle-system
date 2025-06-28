import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AdminDashboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.adminPanelText}>ADMIN PANEL</Text>
      </View>
      <Text style={styles.adminLabel}>Admin Panel</Text>
      <Text style={styles.administratorLabel}>Administrator</Text>

      <View style={styles.entitiesContainer}>
        <TouchableOpacity style={styles.entityBox}>
          <Text style={styles.entityText}>Approvals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.entityBox}>
          <Text style={styles.entityText}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.entityBox}>
          <Text style={styles.entityText}>All Vehicles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.entityBox}>
          <Text style={styles.entityText}>Reports</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickStatsContainer}>
        <Text style={styles.quickStatsTitle}>QUICK STATS</Text>
        <View style={styles.statsItem}>
          <Text style={styles.statsLabel}>Total Users:</Text>
          <Text style={styles.statsValue}>0</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsLabel}>Total Vehicles:</Text>
          <Text style={styles.statsValue}>0</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsLabel}>Pending:</Text>
          <Text style={styles.statsValue}>0</Text>
        </View>
      </View>
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
  adminPanelText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  adminLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  administratorLabel: {
    fontSize: 16,
    marginBottom: 20,
  },
  entitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  entityBox: {
    width: '48%',
    height: 100,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  entityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickStatsContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
  },
  quickStatsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  statsLabel: {
    fontSize: 16,
  },
  statsValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminDashboard;