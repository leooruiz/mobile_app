import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "Recommendation">;

const validationSchema = Yup.object({
  idade: Yup.number()
    .typeError("Informe uma idade válida (somente números)")
    .required("A idade é obrigatória")
    .min(16, "Idade mínima permitida é 16 anos")
    .max(100, "Idade máxima permitida é 100 anos"),

  horizonte: Yup.string()
    .required("Selecione o horizonte de investimento")
    .oneOf(["Curto", "Médio", "Longo"], "Horizonte inválido"),

  risco: Yup.string()
    .required("Selecione o perfil de risco")
    .oneOf(
      ["Conservador", "Moderado", "Agressivo"],
      "Perfil de risco inválido"
    ),

  objetivo: Yup.string()
    .required("O objetivo é obrigatório")
    .min(3, "Descreva melhor seu objetivo (mínimo 3 letras)"),

  valor: Yup.number()
    .typeError("Informe um valor numérico")
    .required("O valor disponível é obrigatório")
    .min(1, "O valor deve ser maior que zero"),
});

export default function InvestorProfileScreen({ navigation }: Props) {
  const [formResetKey, setFormResetKey] = React.useState(Date.now());

  useFocusEffect(
    React.useCallback(() => {
      // toda vez que a tela ganhar foco, força reset
      setFormResetKey(Date.now());
    }, [])
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        key={formResetKey}
        enableReinitialize
        initialValues={{
          idade: "",
          horizonte: "",
          risco: "",
          objetivo: "",
          valor: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await AsyncStorage.setItem("investorProfile", JSON.stringify(values));
          navigation.navigate("Recommendation", { profile: values });
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          handleBlur,
          setFieldValue,
        }) => (
          <View style={styles.container}>
            <Text style={styles.title}>📋 Seu Perfil de Investidor</Text>

            {/* Idade */}
            <TextInput
              placeholder="Idade"
              keyboardType="numeric"
              value={values.idade}
              onChangeText={handleChange("idade")}
              onBlur={handleBlur("idade")}
              style={styles.input}
            />
            {touched.idade && errors.idade && (
              <Text style={styles.error}>{errors.idade}</Text>
            )}

            {/* Horizonte */}
            <Text style={styles.label}>Horizonte de Investimento</Text>
            <Picker
              selectedValue={values.horizonte}
              onValueChange={(value) => setFieldValue("horizonte", value)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione..." value="" />
              <Picker.Item label="Curto prazo" value="Curto" />
              <Picker.Item label="Médio prazo" value="Médio" />
              <Picker.Item label="Longo prazo" value="Longo" />
            </Picker>
            {touched.horizonte && errors.horizonte && (
              <Text style={styles.error}>{errors.horizonte}</Text>
            )}

            {/* Risco */}
            <Text style={styles.label}>Perfil de Risco</Text>
            <Picker
              selectedValue={values.risco}
              onValueChange={(value) => setFieldValue("risco", value)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione..." value="" />
              <Picker.Item label="Conservador" value="Conservador" />
              <Picker.Item label="Moderado" value="Moderado" />
              <Picker.Item label="Agressivo" value="Agressivo" />
            </Picker>
            {touched.risco && errors.risco && (
              <Text style={styles.error}>{errors.risco}</Text>
            )}

            {/* Objetivo */}
            <TextInput
              placeholder="Objetivo principal (ex: aposentadoria)"
              value={values.objetivo}
              onChangeText={handleChange("objetivo")}
              onBlur={handleBlur("objetivo")}
              style={styles.input}
            />
            {touched.objetivo && errors.objetivo && (
              <Text style={styles.error}>{errors.objetivo}</Text>
            )}

            {/* Valor */}
            <TextInput
              placeholder="Valor disponível (R$)"
              keyboardType="numeric"
              value={values.valor}
              onChangeText={handleChange("valor")}
              onBlur={handleBlur("valor")}
              style={styles.input}
            />
            {touched.valor && errors.valor && (
              <Text style={styles.error}>{errors.valor}</Text>
            )}

            <Button title="Salvar" onPress={handleSubmit as any} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 20, marginBottom: 24, textAlign: "center" },
  label: { marginTop: 8, marginBottom: 4, fontWeight: "600" },
  input: { borderWidth: 1, padding: 10, marginBottom: 8, borderRadius: 8 },
  picker: { borderWidth: 1, marginBottom: 8 },
  error: { color: "red", fontSize: 13, marginBottom: 8 },
});
