import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

const API_BASE = "http://10.0.2.2:4000/api"; // Android emulator; change to your ip if using device

export default function Processing({ navigation, route }: any) {
  const { mode = "instant", carId, audioUrl } = route.params || {};

  useEffect(() => {
    const call = async () => {
      try {
        if (mode === "instant") {
          // in real app include auth token; here calling without auth will be blocked by backend authMiddleware
          // For demo, assume you have added Authorization header in axios default or use a public backend
          const res = await axios.post(`${API_BASE}/instant-analyze`, { carId, audioUrl, userId: undefined }, { headers: { Authorization: "Bearer DEMO_TOKEN" } });
          navigation.replace("ResultInstant", { result: res.data });
        } else {
          const res = await axios.post(`${API_BASE}/predict-60days`, { carId, userId: undefined }, { headers: { Authorization: "Bearer DEMO_TOKEN" } });
          navigation.replace("ResultPredict", { result: res.data });
        }
      } catch (err) {
        // If backend auth blocks the demo, we'll simulate a response locally
        console.warn("Backend call failed, using mock result:", err.message || err);
        setTimeout(() => {
          if (mode === "instant") {
            const mock = {
              healthScore: 82,
              riskLevel: "Düşük",
              possibleFaults: [
                { name: "Enjektör dengesiz çalışması", probability: 0.62 },
                { name: "Triger gerginlik sesi", probability: 0.37 }
              ],
              estimatedCostMin: 7500,
              estimatedCostMax: 12000,
              createdAt: new Date().toISOString()
            };
            navigation.replace("ResultInstant", { result: mock });
          } else {
            const mock = {
              riskPercentage: 0.31,
              riskLevel: "Orta",
              predictedIssues: [
                { name: "Turbo yorgunluğu", probability: 0.26 },
                { name: "Enjektör aşınması", probability: 0.22 }
              ],
              recommendation: "5.000 km içinde yağ ve filtre kontrolü yaptırman önerilir."
            };
            navigation.replace("ResultPredict", { result: mock });
          }
        }, 2000);
      }
    };
    call();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00E5FF" />
      <Text style={{ color: "#fff", marginTop: 12 }}>AutoBrain AI dinliyor...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center" }
});