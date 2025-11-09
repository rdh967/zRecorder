// RecordingListItem.js
// Description: A single item in the recordings list.
// Displays the filename and visual feedback if the recording is currently playing.

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function RecordingListItem({ filename, onPress, isPlaying }) {
  return (
    <TouchableOpacity
      style={[styles.container, isPlaying && styles.playingContainer]}
      onPress={onPress}
    >
      <Text style={[styles.text, isPlaying && styles.playingText]}>
        {filename.split('/').pop()} {/* display just the file name, not full URI */}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#2c1f5d', // dark purple base
    borderRadius: 8,
    marginBottom: 10,
  },
  playingContainer: {
    backgroundColor: '#6e4cff', // highlight color when playing
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  playingText: {
    fontWeight: '700', // bold text when playing
  },
});
