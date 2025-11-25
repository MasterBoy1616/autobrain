import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Splash({ navigation }: any) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace("Onboarding"), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>AutoBrain AI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center" },
  logo: { color: "#00E5FF", fontSize: 36, fontWeight: "700" }
});