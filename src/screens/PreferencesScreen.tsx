import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Preferences'>;

export default function PreferencesScreen({ navigation }: Props) {
  const [profile, setProfile] = useState<string | null>(null);
  const [historyLength, setHistoryLength] = useState<number>(0);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const rawProfile = await AsyncStorage.getItem('investorProfile');
    const history = await AsyncStorage.getItem('history');
    setProfile(rawProfile);
    setHistoryLength(history ? JSON.parse(history).length : 0);
  };

  const confirmClear = () => {
    Alert.alert('Confirmar exclusão', 'Deseja apagar todos os dados locais?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Apagar tudo', style: 'destructive', onPress: clearAll },
    ]);
  };

  const clearAll = async () => {
    await AsyncStorage.removeItem('investorProfile');
    await AsyncStorage.removeItem('history');
    setProfile(null);
    setHistoryLength(0);
    Alert.alert('Dados apagados com sucesso!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔐 Preferências e Privacidade</Text>

      <Text style={styles.section}>📁 Dados armazenados:</Text>
      <Text>- Perfil: {profile ? 'Preenchido' : 'Não preenchido'}</Text>
      <Text>- Histórico: {historyLength} recomendações salvas</Text>

      <View style={{ marginTop: 24 }}>
        <Button title="Apagar todos os dados" color="red" onPress={confirmClear} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  section: { fontSize: 18, marginTop: 16, marginBottom: 8 },
});