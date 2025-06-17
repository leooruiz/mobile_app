import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { saveUser } from "../storage/authStorage";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [name, setName] = useState("");

  const handleLogin = async () => {
    if (name.trim()) {
      await saveUser(name);
      navigation.replace("InvestorProfile");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assessor XP</Text>
      <TextInput
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 24, marginBottom: 16, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 16, borderRadius: 8 },
});
