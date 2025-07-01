import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginSignup from "./src/screens/LoginSignup";
import Dashboard from "./src/screens/Dashboard";
import AddVehicle from "./src/screens/AddVehicle";
import Vehicles from "./src/screens/Vehicles";
import Approvals from "./src/screens/Approvals";
import AdminDashboard from "./src/screens/AdminDashboard";
import Users from "./src/screens/Users";

const Stack = createNativeStackNavigator();

export default function App() {
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
          options={{ headerBackVisible: true }}
          name="Vehicles"
          component={Vehicles}
        />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="Approvals" component={Approvals} />
        <Stack.Screen
          name="Profile"
          component={require("./src/screens/Profile").default}
        />
        <Stack.Screen
          name="EditProfile"
          component={require("./src/screens/EditProfile").default}
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
