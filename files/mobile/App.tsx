import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation";

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}