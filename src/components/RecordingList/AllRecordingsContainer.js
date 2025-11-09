// AllRecordingsContainer.js
// Description: Loads all recordings from DocumentDirectory and passes them to RecordingsList.

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import RecordingsList from './RecordingsList/RecordingsList';

export default function AllRecordingsContainer() {
  const [recordings, setRecordings] = useState([]);

  // Function to load recordings
  const loadRecordings = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
      const audioFiles = files
        .filter(f => f.endsWith('.m4a') || f.endsWith('.mp4'))
        .map(f => FileSystem.documentDirectory + f);
      setRecordings(audioFiles);
    } catch (error) {
      console.error('Error loading recordings:', error);
    }
  };

  // Load recordings on mount
  useEffect(() => {
    loadRecordings();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <RecordingsList recordings={recordings} />
    </View>
  );
}
