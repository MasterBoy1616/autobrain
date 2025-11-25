import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Home({ navigation }: any) {
  // demo selected car info (in a real app load user/car from backend)
  const car = { id: "car-demo-1", plate: "34ABCD1", brandModel: "Ford Fiesta 2016", km: 92000 };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.plate}>{car.plate}</Text>
        <Text style={styles.brand}>{car.brandModel}</Text>
        <Text style={styles.km}>{car.km} km</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Record", { carId: car.id })}>
        <Text style={styles.buttonText}>Anlık Arıza Tespiti</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Processing", { screen: "predict", carId: car.id })}>
        <Text style={styles.buttonText}>60 Gün Tahmini</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => alert("Placeholder: Değer Kaybı & Masraf")}>
        <Text style={styles.buttonText}>Değer Kaybı & Masraf</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate("History")}>
          <Text style={{ color: "#00E5FF" }}>Geçmiş Analizler</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={{ color: "#ff7a1a", marginTop: 8 }}>Profil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20, alignItems: "center" },
  card: { backgroundColor: "#0a0a0a", padding: 20, width: "100%", borderRadius: 8, marginBottom: 24 },
  plate: { color: "#00E5FF", fontSize: 24, fontWeight: "700" },
  brand: { color: "#fff", marginTop: 4 },
  km: { color: "#aaa", marginTop: 4 },
  button: { backgroundColor: "#00E5FF", padding: 16, width: "100%", borderRadius: 8, marginTop: 12 },
  buttonText: { textAlign: "center", fontWeight: "600", color: "#000" }
});