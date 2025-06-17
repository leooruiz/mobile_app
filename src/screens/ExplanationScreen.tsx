import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerParamList } from "../navigation/DrawerNavigator";
import { RootStackParamList } from "../navigation/AppNavigator";
import CustomHeaderWithBack from "../components/CustomHeaderWithBack";

type Props = NativeStackScreenProps<RootStackParamList, "Explanation">;

type Profile = {
  idade: string;
  horizonte: string;
  risco: string;
  objetivo: string;
  valor: string;
};

export default function ExplanationScreen({ navigation }: Props) {
  const [explanation, setExplanation] = useState<string>("");

  useEffect(() => {
    const loadExplanation = async () => {
      try {
        const raw = await AsyncStorage.getItem("investorProfile");
        if (!raw) return;

        const profile: Profile = JSON.parse(raw);
        if (
          !profile ||
          !profile.risco ||
          !profile.objetivo ||
          !profile.valor ||
          !profile.horizonte
        ) {
          setExplanation("Não foi possível carregar seu perfil de investidor.");
          return;
        }
        const txt = generateExplanation(profile);
        setExplanation(txt);
      } catch (error) {
        setExplanation("Ocorreu um erro ao carregar seu perfil de investidor.");
      }
    };

    loadExplanation();
  }, []);

  const generateExplanation = (profile: Profile): string => {
    const { risco, objetivo, valor, horizonte } = profile;
    const parsedValor = Number(valor);
    let base = `📊 Com base no seu perfil `;

    base += `(${risco}, horizonte de ${horizonte}, objetivo "${objetivo}", e valor disponível de R$ ${parsedValor.toFixed(
      2
    )}), `;
    base += `sugerimos uma carteira ajustada ao seu apetite de risco e necessidade de liquidez. `;

    switch (risco.toLowerCase()) {
      case "conservador":
        base += `Optamos por ativos de baixo risco como Tesouro Selic e CDBs, priorizando segurança e liquidez.`;
        break;
      case "moderado":
        base += `Equilibramos segurança com crescimento, incluindo Tesouro IPCA e fundos multimercado.`;
        break;
      case "agressivo":
        base += `Incluímos ativos com maior potencial de retorno, como ações e criptoativos, aceitando maior volatilidade.`;
        break;
      default:
        base += `Não foi possível gerar uma explicação detalhada sem um perfil definido.`;
    }

    base += `\n\n🧠 Essa explicação foi gerada com base nas variáveis fornecidas no formulário de perfil e simula a atuação de um modelo de IA explicável.`;

    return base;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeaderWithBack title="Explicação da Recomendação" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🧠 Explicação da Recomendação</Text>
        <Text style={styles.text}>{explanation}</Text>

        <View style={styles.buttonContainer}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: 24, paddingBottom: 48 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  text: { fontSize: 16, lineHeight: 22, marginBottom: 24 },
  buttonContainer: { marginTop: 16 },
});
