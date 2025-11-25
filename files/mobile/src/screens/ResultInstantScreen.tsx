import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

export default function ResultInstant({ route }: any) {
  const { result } = route.params || {};
  if (!result) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Anlık Arıza Tespiti</Text>
      <Text style={styles.score}>Health Score: {result.healthScore}</Text>
      <Text style={{ color: "#fff" }}>Risk: {result.riskLevel}</Text>

      <Text style={{ color: "#fff", marginTop: 12, fontWeight: "700" }}>Olası Arızalar</Text>
      <FlatList
        data={result.possibleFaults || []}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }: any) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
            <Text style={{ color: "#fff" }}>{item.name}</Text>
            <Text style={{ color: "#aaa" }}>{Math.round(item.probability * 100)}%</Text>
          </View>
        )}
      />

      <Text style={{ color: "#fff", marginTop: 12 }}>
        Tahmini Masraf: {result.estimatedCostMin} — {result.estimatedCostMax} TL
      </Text>

      <TouchableOpacity onPress={() => alert("PDF Rapor Oluşturma (placeholder)")} style={styles.button}>
        <Text style={{ color: "#000" }}>PDF Rapor Oluştur</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { color: "#00E5FF", fontSize: 24, fontWeight: "700" },
  score: { color: "#fff", marginTop: 8, fontSize: 20 },
  button: { backgroundColor: "#00E5FF", padding: 12, borderRadius: 8, marginTop: 16, alignItems: "center" }
});