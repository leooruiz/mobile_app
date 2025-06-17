import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Recommendation">;

type Profile = {
  idade: string;
  horizonte: string;
  risco: string;
  objetivo: string;
  valor: string;
};

const saveToHistory = async (profile: Profile, carteira: string) => {
  const entry = {
    data: new Date().toLocaleString(),
    perfil: profile,
    carteira,
  };

  const existing = await AsyncStorage.getItem("history");
  const parsed = existing ? JSON.parse(existing) : [];
  parsed.push(entry);
  await AsyncStorage.setItem("history", JSON.stringify(parsed));
};

export default function RecommendationScreen({ navigation }: Props) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [recommendation, setRecommendation] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      const raw = await AsyncStorage.getItem("investorProfile");
      if (raw) {
        const parsed: Profile = JSON.parse(raw);
        setProfile(parsed);
        setRecommendation(generateRecommendation(parsed.risco));
        await saveToHistory(parsed, generateRecommendation(parsed.risco));
      }
    };
    load();
  }, []);

  const generateRecommendation = (risco: string): string => {
    switch (risco.toLowerCase()) {
      case "conservador":
        return `💼 Carteira Recomendada:\n- 70% Tesouro Selic\n- 20% CDB Liquidez Diária\n- 10% LC`;
      case "moderado":
        return `💼 Carteira Recomendada:\n- 40% Tesouro IPCA+\n- 30% Fundos Multimercado\n- 30% Ações de empresas sólidas`;
      case "agressivo":
        return `💼 Carteira Recomendada:\n- 60% Ações (BR e EUA)\n- 20% Criptoativos\n- 20% Fundos Ativos`;
      default:
        return "Perfil não identificado.";
    }
  };

  if (!profile) return <Text style={styles.loading}>Carregando perfil...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Olá, investidor!</Text>
      <Text style={styles.sub}>Perfil de Risco: {profile.risco}</Text>
      <Text style={styles.recommendation}>{recommendation}</Text>

      <Button
        title="Ver explicação da recomendação"
        onPress={() => navigation.navigate("Explanation")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  sub: { fontSize: 18, marginBottom: 12 },
  recommendation: {
    fontSize: 16,
    backgroundColor: "#eef",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
});
