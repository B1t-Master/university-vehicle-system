import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginSignup from "./src/screens/LoginSignup";
import Dashboard from "./src/screens/Dashboard";
import AddVehicle from "./src/screens/AddVehicle";
import { onAuthStateChanged } from "firebase/auth";
import { isAdmin } from "./src/authentication/authentication";
import { auth } from "./src/firebase";
import MyVehicles from "./src/screens/MyVehicles";
import { useState, useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // Check if the user is an admin
          const adminStatus = await isAdmin(user.uid);
          setIsAdminUser(adminStatus);
        } else {
          setIsAdminUser(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        // Handle the error appropriately, e.g., display an error message to the user
      }
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginSignup">
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginSignup"
          component={LoginSignup}
        />
        <Stack.Screen
          options={{ headerBackVisible: false }}
          name="Dashboard"
          component={Dashboard}
        />
        <Stack.Screen
          options={{ headerBackVisible: false }}
          name="AddVehicle"
          component={AddVehicle}
        />
        <Stack.Screen
          options={{ headerBackVisible: false }}
          name="MyVehicles"
          component={MyVehicles}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
