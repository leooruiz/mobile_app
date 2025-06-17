import React from 'react';
import { View, Text, Button } from 'react-native';
import { removeUser } from '../storage/authStorage';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bem-vindo ao Assessor XP!</Text>
      <Button title="Sair" onPress={async () => await removeUser()} />
    </View>
  );
}