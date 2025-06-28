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

const Stack = createNativeStackNavigator();

export default function App() {
  const checkUserDocument = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        createdAt: new Date(),
        // other default fields
      });
    }
  };
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
        <Stack.Screen name="Approvals" component={Approvals} />
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
