import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";

const API_BASE = "http://10.0.2.2:4000/api";

export default function History() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_BASE}/analyses`, { params: { userId: "demo" }, headers: { Authorization: "Bearer DEMO_TOKEN" } });
        setItems(res.data);
      } catch (err) {
        // fallback mock
        setItems([
          { id: "1", type: "instant", healthScore: 82, riskLevel: "Düşük", createdAt: new Date().toISOString() },
          { id: "2", type: "predict", riskPercentage: 0.31, riskLevel: "Orta", createdAt: new Date().toISOString() }
        ]);
      }
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={{ color: "#fff" }}>{item.type}</Text>
            <Text style={{ color: "#aaa" }}>{item.healthScore ?? Math.round((item.riskPercentage ?? 0) * 100) + "%"}</Text>
            <Text style={{ color: "#666" }}>{new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 12 },
  row: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#111" }
});