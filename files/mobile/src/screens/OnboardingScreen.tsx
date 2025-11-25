import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Onboarding({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AutoBrain AI</Text>
      <Text style={styles.text}>1. Motor sesini kaydet</Text>
      <Text style={styles.text}>2. Anlık arıza tespiti</Text>
      <Text style={styles.text}>3. 60 gün tahmini</Text>
      <Button title="Başla" onPress={() => navigation.replace("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center", padding: 20 },
  title: { color: "#00E5FF", fontSize: 32, fontWeight: "700", marginBottom: 20 },
  text: { color: "#fff", fontSize: 18, marginVertical: 8 }
});