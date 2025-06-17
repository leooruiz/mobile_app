import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { DrawerScreenProps } from "@react-navigation/drawer";

import { RootStackParamList } from "../navigation/AppNavigator";
import { DrawerParamList } from "../navigation/DrawerNavigator";

type Props = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, "History">,
  NativeStackScreenProps<RootStackParamList>
>;

type Entry = {
  data: string;
  carteira: string;
  perfil: {
    idade: string;
    horizonte: string;
    risco: string;
    objetivo: string;
    valor: string;
  };
};

export default function HistoryScreen({ navigation }: Props) {
  const [history, setHistory] = useState<Entry[]>([]);

  useEffect(() => {
    AsyncStorage.getItem("history").then((data) => {
      if (data) setHistory(JSON.parse(data).reverse());
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={history}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Recommendation", { profile: item.perfil })
            }
          >
            <Text style={styles.date}>{item.data}</Text>
            <Text>
              🎯 Perfil: {item.perfil.risco}, objetivo: {item.perfil.objetivo}
            </Text>
            <Text style={styles.block}>{item.carteira}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: "#eef",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  block: { marginTop: 8, fontFamily: "monospace" },
  date: { fontWeight: "bold", marginBottom: 4 },
});
