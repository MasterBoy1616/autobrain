import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Profile({ navigation }: any) {
  // Demo user
  const user = { name: "Test User", email: "test@autobrain.ai" };

  return (
    <View style={styles.container}>
      <Text style={{ color: "#00E5FF", fontSize: 20 }}>{user.name}</Text>
      <Text style={{ color: "#fff", marginTop: 8 }}>{user.email}</Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: "#ff7a1a" }]} onPress={() => alert("Logout (placeholder)")}>
        <Text style={{ color: "#000" }}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  button: { padding: 12, borderRadius: 8, marginTop: 24, alignItems: "center" }
});