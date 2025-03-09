import { View, Text, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
const about = () => {
  const router = useRouter();
  return (
    <View>
      <Text>about</Text>
      <Button title="Go to Home" onPress={() => router.replace("/")} />
    </View>
  );
};

export default about;
