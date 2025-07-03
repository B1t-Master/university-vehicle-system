import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";

const ComingSoon = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Coming Soon!</Text> */}
      <LottieView
        source={require("../assets/coming-soon.json")}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />
      <Text style={styles.subtitle}>We're working on it</Text>
      <Text style={styles.text}>
        This feature is currently under development.
      </Text>
      <Text style={styles.text}>Please check back later!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: "#666",
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default ComingSoon;
