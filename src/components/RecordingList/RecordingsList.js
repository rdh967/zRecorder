// src/components/RecordingsList.js
// Description: Displays a list of recordings passed in as a prop.
// Tapping a recording plays or pauses it, and stops any previously playing recording.

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import RecordingListItem from './RecordingListItem';

export default function RecordingsList({ recordings }) {
  // State to store the currently loaded audio
  // This holds an Audio.Sound object from the expo-av library, which is essentially a handle
  // to the loaded audio file in memory. The Audio.Sound object lets us:
  // - play the recording (playAsync)
  // - pause it (pauseAsync)
  // - stop it (stopAsync)
  // - unload it to free memory (unloadAsync)
  const [sound, setSound] = useState(null);

  // State to track which recording is currently active (playing or paused)
  // Stores the filename or full URI of the actively loaded audio
  // Used to highlight the active list item and ensure only one recording is loaded at a time
  const [playingFile, setPlayingFile] = useState(null);

  // State to track if the current recording is actively playing
  const [isPlaying, setIsPlaying] = useState(false);

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  // Play or pause a recording when an item is tapped
  const handlePlayPause = async (filename) => {
    try {
      if (playingFile === filename && sound) {
        // Tapped the currently loaded recording
        const status = await sound.getStatusAsync();
        if (status.isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      } else {
        // Tapped a new recording
        if (sound) {
          await sound.stopAsync();
          await sound.unloadAsync();
        }

        const { sound: newSound } = await Audio.Sound.createAsync({ uri: filename });
        setSound(newSound);
        setPlayingFile(filename);
        setIsPlaying(true);
        await newSound.playAsync();

        // Update isPlaying when playback finishes
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
            setPlayingFile(null);
          }
        });
      }
    } catch (error) {
      console.error('Error in play/pause:', error);
    }
  };

  const renderItem = ({ item }) => (
    <RecordingListItem
      filename={item}
      onPress={() => handlePlayPause(item)}
      isPlaying={item === playingFile && isPlaying} // highlight only if actively playing
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recordings</Text>
      {recordings && recordings.length > 0 ? (
        <FlatList
          data={recordings}
          keyExtractor={(item) => item}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.empty}>No recordings yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b103a', // deep indigo-purple
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: 'white',
    marginBottom: 10,
    fontWeight: '600',
  },
  empty: {
    color: '#aaa',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
