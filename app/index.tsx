import React, { useState } from "react";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Switch,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://api.hetuv2x.com/vehicle-openapi/sys/login";
  const appCid = "C988324";
  const appSecret = "988uhVHB76742773234";

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter username and password.");
      return;
    }
    if (!agree) {
      Alert.alert("Error", "You must agree to the terms and conditions.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appCid, appSecret }),
      });

      const result = await response.json();

      if (result.code === 200) {
        const token = result.data.Authorization;
        await AsyncStorage.setItem("authToken", token);

        Alert.alert("Success", "Login Successful!");
        router.replace("/home");
      } else {
        Alert.alert("Login Failed", result.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
        <Ionicons name="globe" size={20} color="#007BFF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="IP Address"
          value={ipAddress}
          onChangeText={setIpAddress}
        />
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.loginText}>Login</Text>
        )}
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

      <Button title="Go to Home" onPress={() => router.replace("/home")} />
      <Link
        href="/signup"
        style={{
          textDecorationLine: "none",
          color: "blue",
          marginVertical: 10,
        }}
      >
        Not Signed? Signup
      </Link>
      <Text style={styles.language}>English</Text>
    </View>
  );
};

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
  loginButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    width: "80%",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 15,
  },
  loginText: {
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

export default Login;
