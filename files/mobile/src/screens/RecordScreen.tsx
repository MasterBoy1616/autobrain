import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Record({ navigation, route }: any) {
  const { carId } = route.params || {};
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<any>(null);

  const start = () => {
    setRecording(true);
    setSeconds(0);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  };

  const stop = async () => {
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    // In this MVP we use a dummy audio URL
    const dummyAudioUrl = "local://dummy-recording.wav";
    // Navigate to processing and pass payload
    navigation.navigate("Processing", { mode: "instant", carId, audioUrl: dummyAudioUrl });
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff", marginBottom: 12 }}>Kayıt Süresi: {String(seconds).padStart(2, "0")} / 15</Text>
      <TouchableOpacity
        onPress={() => (recording ? stop() : start())}
        style={[styles.circle, { backgroundColor: recording ? "#ff7a1a" : "#00E5FF" }]}
      >
        <Text style={{ color: "#000", fontWeight: "700" }}>{recording ? "DUR" : "KAYIT"}</Text>
      </TouchableOpacity>
      <Text style={{ color: "#666", marginTop: 12 }}>Telefon mikrofonunu kullanarak motor sesini kaydeder.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center" },
  circle: { width: 140, height: 140, borderRadius: 70, alignItems: "center", justifyContent: "center" }
});