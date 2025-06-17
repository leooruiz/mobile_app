import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'InvestorProfile'>;

export default function InvestorProfileScreen({ navigation }: Props) {
  return (
    <Formik
      initialValues={{
        idade: '',
        horizonte: '',
        risco: '',
        objetivo: '',
        valor: '',
      }}
      validationSchema={Yup.object({
        idade: Yup.number().required(),
        horizonte: Yup.string().required(),
        risco: Yup.string().required(),
        objetivo: Yup.string().required(),
        valor: Yup.number().required(),
      })}
      onSubmit={async (values) => {
        await AsyncStorage.setItem('investorProfile', JSON.stringify(values));
        navigation.navigate('Recommendation');
      }}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Seu Perfil de Investidor</Text>
          <TextInput placeholder="Idade" keyboardType="numeric" value={values.idade} onChangeText={handleChange('idade')} style={styles.input} />
          <TextInput placeholder="Horizonte (Curto/Médio/Longo)" value={values.horizonte} onChangeText={handleChange('horizonte')} style={styles.input} />
          <TextInput placeholder="Risco (Conservador/Moderado/Agressivo)" value={values.risco} onChangeText={handleChange('risco')} style={styles.input} />
          <TextInput placeholder="Objetivo Principal" value={values.objetivo} onChangeText={handleChange('objetivo')} style={styles.input} />
          <TextInput placeholder="Valor disponível (R$)" keyboardType="numeric" value={values.valor} onChangeText={handleChange('valor')} style={styles.input} />
          <Button title="Continuar" onPress={handleSubmit as any} />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8 },
});