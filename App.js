import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// File: App.js
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RecordScreen from './src/screens/RecordScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <RecordScreen />
    </SafeAreaProvider>
  );
}
