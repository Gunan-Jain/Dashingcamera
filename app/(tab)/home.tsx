import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import StatsCard from "../Components/StatsCard";
import AlarmCard from "../Components/AlarmCard";
import Chart from "../Components/Chart"; // Updated Chart Component

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <StatsCard />
      <AlarmCard />
      <Chart type="line" title="ADAS & DSM Trends" />
      <Chart type="pie" title="ADAS & DSM Distribution" />
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Safety Alarm Ranking</Text>
        <Text style={styles.noData}>No data, click to load!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB" },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 15, margin: 10 },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  noData: { color: "#FFA500", marginTop: 10 },
});

export default Home;
