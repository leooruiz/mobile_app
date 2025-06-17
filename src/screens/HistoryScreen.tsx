import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'History'>;

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
    AsyncStorage.getItem('history').then((data) => {
      if (data) setHistory(JSON.parse(data).reverse()); // mais recentes primeiro
    });
  }, []);

  return (
    <FlatList
      data={history}
      keyExtractor={(_, i) => i.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.date}>{item.data}</Text>
          <Text>🎯 Perfil: {item.perfil.risco}, objetivo: {item.perfil.objetivo}</Text>
          <Text style={styles.block}>{item.carteira}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: '#eef',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  block: { marginTop: 8, fontFamily: 'monospace' },
  date: { fontWeight: 'bold', marginBottom: 4 },
});