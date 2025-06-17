import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'user';

export async function saveUser(user: string) {
  await AsyncStorage.setItem(KEY, JSON.stringify(user));
}

export async function getUser(): Promise<string | null> {
  const user = await AsyncStorage.getItem(KEY);
  return user ? JSON.parse(user) : null;
}

export async function removeUser() {
  await AsyncStorage.removeItem(KEY);
}