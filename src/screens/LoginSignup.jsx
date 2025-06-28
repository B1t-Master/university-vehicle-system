import React from "react";
import { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import password from "../assets/password.png";
import email from "../assets/email.png";
import { handleRegister, handleSignIn } from "../authentication/authentication";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../firebase";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigation = useNavigation();
  const isStrathmoreEmail = (email) => {
    return /^(?:[a-zA-Z0-9._%+-]+@strathmore\.edu|admin@gmail\.com)$/.test(
      email
    );
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified || user.email === "admin@gmail.com") {
          if (user.email === "admin@gmail.com") {
            navigation.navigate("AdminDashboard");
          } else {
            navigation.navigate("Dashboard");
          }
        } else {
          alert("Please verify your email before accessing the dashboard.");
          auth.signOut();
        }
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/sulogo.png")}
          style={styles.logoImage}
        />
      </View>

      <Text style={styles.title}>Car Sticker</Text>
      <Text style={styles.subtitle}>Creation and Access System</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Image source={email} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#000"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
        </View>

        <View style={styles.inputSubContainer}>
          <Image source={password} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#000"
            secureTextEntry={true}
            value={passwordValue}
            onChangeText={setPasswordValue}
          />
        </View>
      </View>

      {/* {isLogin && <Text style={styles.forgotPassword}>Forgot Password?</Text>} */}

      <View style={styles.buttonContainer}>
        {isLogin && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              isStrathmoreEmail(emailAddress)
                ? handleSignIn(emailAddress, passwordValue)
                : alert("Please use your Strathmore University email");
            }}
          >
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
        )}

        {!isLogin && (
          <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
            onPress={() =>
              isStrathmoreEmail(emailAddress)
                ? handleRegister(emailAddress, passwordValue)
                : alert(
                    "Please use a Strathmore University email (e.g., yourname@strathmore.edu)"
                  )
            }
          >
            <Text style={styles.buttonOutlineText}>REGISTER</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.footer}>
        <Text>
          {isLogin ? "Don't have an account?" : "Have an account?"}
          <Text style={styles.footerText} onPress={() => setIsLogin(!isLogin)}>
            {" "}
            {isLogin ? "Register" : "Login"}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 20,
  },
  header: {
    width: "100%",
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  inputIcon: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#000",
  },
  //   forgotPassword: {
  //     alignSelf: "flex-end",
  //     marginBottom: 20,
  //   },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    marginTop: -30,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    marginTop: -30,
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    alignItems: "center",
  },
  footerText: {
    color: "blue",
  },
});

export default LoginSignup;
