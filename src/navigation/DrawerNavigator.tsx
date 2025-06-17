import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ExplanationScreen from "../screens/ExplanationScreen";
import HistoryScreen from "../screens/HistoryScreen";
import InvestorProfileScreen from "../screens/InvestorProfileScreen";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import RecommendationScreen from "../screens/RecomendationScreen";
import { Profile } from "../types";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export type DrawerParamList = {
  InvestorProfile: undefined;
  History: undefined;
  Recommendation: { profile: Profile };
  Explanation: { profile: Profile };
};

const CustomHeader = ({
  navigation,
  title,
}: {
  navigation: any;
  title: string;
}) => (
  <SafeAreaView edges={["top"]} style={{ backgroundColor: "#333" }}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  </SafeAreaView>
);

const withHeader = (Component: React.ComponentType<any>, title: string) => {
  return (props: any) => (
    <>
      <CustomHeader navigation={props.navigation} title={title} />
      <Component {...props} />
    </>
  );
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="InvestorProfile"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="History"
        children={(props) => withHeader(HistoryScreen, "Histórico")(props)}
        options={{ drawerLabel: "Histórico" }}
      />
      <Drawer.Screen
        name="InvestorProfile"
        children={(props) =>
          withHeader(InvestorProfileScreen, "Perfil do Investidor")(props)
        }
        options={{ drawerLabel: "Perfil do Investidor" }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 16,
  },
  title: {
    color: "white",
    fontSize: 18,
    marginLeft: 12,
    fontWeight: "bold",
  },
});
