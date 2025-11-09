// File: /app/components/RecordButton.js
// Description: A record/stop button. Starts as a red circle. On press, starts recording.
// When recording, changes to a red square. Stops recording on press, saves file, shows notification, then resets.

import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, ToastAndroid, Platform, Alert } from 'react-native';
import { startRecording, stopRecording } from '../svc/recorder';
import { generateFilename, moveFile } from '../svc/storage';

export default function RecordButton() {
  const [isRecording, setIsRecording] = useState(false);

  const handlePress = async () => {
    if (!isRecording) {
      // Start recording
      await startRecording();
      setIsRecording(true);
    } else {
      // Stop recording
      const uri = await stopRecording();
      if (!uri) {
        setIsRecording(false);
        return;
      }

      // Generate filename and move file
      const filename = generateFilename();
      const newUri = await moveFile(uri, filename);

      // Notify user
      if (Platform.OS === 'android') {
        ToastAndroid.show(`Saved: ${filename}`, ToastAndroid.SHORT);
      } else {
        Alert.alert('Recording Saved', filename);
      }

      // Reset button
      setIsRecording(false);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.button, isRecording ? styles.square : styles.circle]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 40, // makes it a circle
  },
  square: {
    borderRadius: 8, // slightly rounded square
  },
});
