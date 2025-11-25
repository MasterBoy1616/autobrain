import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/SplashScreen";
import Onboarding from "../screens/OnboardingScreen";
import Home from "../screens/HomeScreen";
import Record from "../screens/RecordScreen";
import Processing from "../screens/ProcessingScreen";
import ResultInstant from "../screens/ResultInstantScreen";
import ResultPredict from "../screens/ResultPredictScreen";
import History from "../screens/HistoryScreen";
import Profile from "../screens/ProfileScreen";

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Home: undefined;
  Record: { carId?: string } | undefined;
  Processing: undefined;
  ResultInstant: { result: any } | undefined;
  ResultPredict: { result: any } | undefined;
  History: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Record" component={Record} />
      <Stack.Screen name="Processing" component={Processing} />
      <Stack.Screen name="ResultInstant" component={ResultInstant} />
      <Stack.Screen name="ResultPredict" component={ResultPredict} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}