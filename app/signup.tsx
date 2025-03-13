import React, { useState } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Signup = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
    },
    logo: {
      width: 120,
      height: 80,
      marginBottom: 30,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "80%",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      paddingHorizontal: 10,
      marginVertical: 10,
    },
    icon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      height: 40,
    },
    signUpButton: {
      backgroundColor: "#007BFF",
      paddingVertical: 12,
      width: "80%",
      alignItems: "center",
      borderRadius: 8,
      marginVertical: 15,
    },
    signUpText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },
    agreementContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
      width: "80%",
    },
    agreementText: {
      color: "#555",
      marginLeft: 8,
      flex: 1,
    },
    link: {
      color: "#007BFF",
    },
    language: {
      marginTop: 20,
      color: "#007BFF",
    },
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSignup = async () => {
    if (!username || !password || !email) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      const response = await fetch(
        "https://api.hetuv2x.com/vehicle-openapi/sys/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            email,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "User registered successfully!");
      } else {
        Alert.alert("Error", data.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Please try again.");
      console.error("Signup Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://yourlogo.com/car_logo.png" }}
        style={styles.logo}
      />

      <View style={styles.inputContainer}>
        <Ionicons name="person" size={20} color="#007BFF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed"
          size={20}
          color="#007BFF"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#007BFF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignup}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.agreementContainer}>
        <Switch
          value={agree}
          onValueChange={setAgree}
          trackColor={{ false: "#ccc", true: "#007BFF" }}
          thumbColor={agree ? "#fff" : "#f4f3f4"}
        />
        <Text style={styles.agreementText}>
          Please read and agree to{" "}
          <Text style={styles.link}>《User Agreement》</Text> and{" "}
          <Text style={styles.link}>《Privacy Policy》</Text>
        </Text>
      </View>
      <Link href="/" style={{ textDecorationLine: "none", color: "blue" }}>
        Already have account? Login here
      </Link>
      <Text style={styles.language}>English</Text>
    </View>
  );
};

export default Signup;
