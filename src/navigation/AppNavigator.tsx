import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getUser } from "../storage/authStorage";

import LoginScreen from "../screens/LoginScreen";
import RecommendationScreen from "../screens/RecomendationScreen";
import PreferencesScreen from "../screens/PreferencesScreen";
import DrawerNavigator from "./DrawerNavigator";
import ExplanationScreen from "../screens/ExplanationScreen";
import { Profile } from "../types";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Preferences: undefined;
  Explanation: { profile: Profile };
  Recommendation: { profile: Profile };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParamList>("Login");

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        setInitialRoute("Home");
      }
    });
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
      <Stack.Screen name="Explanation" component={ExplanationScreen} />
      <Stack.Screen name="Recommendation" component={RecommendationScreen} />
      <Stack.Screen name="Home" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}
