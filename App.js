import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginSignup from "./src/screens/LoginSignup";
import Dashboard from "./src/screens/Dashboard";
import AddVehicle from "./src/screens/AddVehicle";
import AdminDashboard from "./src/screens/AdminDashboard";
import { useState, useEffect } from "react";
import { auth } from "./src/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { isAdmin } from "./src/authentication/authentication";


const Stack = createNativeStackNavigator();
export default function App() {
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const adminStatus = await isAdmin(user.uid);
        setIsAdminUser(adminStatus);
      } else {
        setIsAdminUser(false);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          options={{ headerShown: false }}
          name="login"
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
        {isAdminUser && (
          <Stack.Screen
            options={{ headerBackVisible: false }}
            name="AdminDashboard"
            component={AdminDashboard}
          />
        )}
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
