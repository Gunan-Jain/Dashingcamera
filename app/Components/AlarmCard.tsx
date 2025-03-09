import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const AlarmCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Today Alarms</Text>
      <View style={styles.row}>
        <View style={styles.alarmBox}>
          <FontAwesome name="bell" size={24} color="red" />
          <Text style={styles.text}>0 Normal Alarm</Text>
        </View>
        <View style={styles.alarmBox}>
          <FontAwesome name="shield" size={24} color="green" />
          <Text style={styles.text}>0 Safety</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  alarmBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 5,
  },
});

export default AlarmCard;