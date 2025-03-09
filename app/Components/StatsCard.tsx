import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatsCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Data</Text>
      <View style={styles.statsRow}>
        <Text style={styles.stat}>9 Total</Text>
        <Text style={[styles.stat, { color: "green" }]}>7 Online</Text>
        <Text style={[styles.stat, { color: "gray" }]}>2 Offline</Text>
        <Text style={[styles.stat, { color: "red" }]}>0 Alarm</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007AFF",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  stat: {
    color: "#fff",
    fontSize: 16,
  },
});

export default StatsCard;