import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getUser } from "../storage/authStorage";

import LoginScreen from "../screens/LoginScreen";
import InvestorProfileScreen from "../screens/InvestorProfileScreen";
import RecommendationScreen from "../screens/RecomendationScreen";
import ExplanationScreen from "../screens/ExplanationScreen";
import HistoryScreen from "../screens/HistoryScreen";
import PreferencesScreen from "../screens/PreferencesScreen";
import HomeScreen from "../screens/HomeScreen";

export type RootStackParamList = {
  Login: undefined;
  InvestorProfile: undefined;
  Recommendation: undefined;
  Explanation: undefined;
  History: undefined;
  Preferences: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParamList>("Login");

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        setInitialRoute("InvestorProfile");
      }
    });
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="InvestorProfile" component={InvestorProfileScreen} />
      <Stack.Screen name="Recommendation" component={RecommendationScreen} />
      <Stack.Screen name="Explanation" component={ExplanationScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
