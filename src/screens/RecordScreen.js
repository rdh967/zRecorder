// File: /src/screens/RecordScreen.js
// Description: Screen that centers the RecordButton with a deep indigo/purple background.

import React from 'react';
import { View, StyleSheet } from 'react-native';
import RecordButton from '../components/RecordButton';

export default function RecordScreen() {
  return (
    <View style={styles.container}>
      <RecordButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b0a3d', // deep mysterious indigo/purple
    justifyContent: 'center',
    alignItems: 'center',
  },
});
