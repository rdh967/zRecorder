// File: /src/screens/RecordScreen.js
// Description: Screen that centers the RecordButton with a deep indigo/purple background.

import React from 'react';
import { View, StyleSheet, Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import RecordButton from '../components/RecordButton';
import AllRecordingsContainer from '../components/RecordingList/AllRecordingsContainer';

export default function RecordScreen() {
  return (

      <SafeAreaView style={{ flex: 1, backgroundColor: '#1b103a',}}>

    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>zRecorder</Text>
      </View>
      <View style={{ padding: 100 }}>
        <RecordButton />
      </View>
      <View style={styles.recordingsListContainer}>
        <AllRecordingsContainer/>
      </View>
    </View>

        </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b0a3d', // deep mysterious indigo/purple
    justifyContent: 'center',
    alignItems: 'center',
  },

  banner: {
    width: '100%',
    paddingTop: 1,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#1b103a',
    alignItems: "center",
  },

  bannerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  recordingsListContainer: {
    flex: 1,
    width: '100%',             // ensures list stretches full width
  },
});
