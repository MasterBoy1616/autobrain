import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

export default function ResultPredict({ route }: any) {
  const { result } = route.params || {};
  if (!result) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>60 Gün Tahmini</Text>
      <Text style={{ color: "#fff", marginTop: 8 }}>Risk: {Math.round(result.riskPercentage * 100)}% ({result.riskLevel})</Text>

      <Text style={{ color: "#fff", marginTop: 12, fontWeight: "700" }}>Tahmin Edilen Arızalar</Text>
      <FlatList
        data={result.predictedIssues || []}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }: any) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
            <Text style={{ color: "#fff" }}>{item.name}</Text>
            <Text style={{ color: "#aaa" }}>{Math.round(item.probability * 100)}%</Text>
          </View>
        )}
      />

      <Text style={{ color: "#ff7a1a", marginTop: 12 }}>{result.recommendation}</Text>
      <TouchableOpacity onPress={() => alert("PDF Rapor Oluşturma (placeholder)")} style={styles.button}>
        <Text style={{ color: "#000" }}>PDF Rapor Oluştur</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { color: "#00E5FF", fontSize: 24, fontWeight: "700" },
  button: { backgroundColor: "#00E5FF", padding: 12, borderRadius: 8, marginTop: 16, alignItems: "center" }
});