// RecordingListItem.js
// Description: A single item in the recordings list.
// Displays the filename and visual feedback if the recording is currently playing.

import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, Animated, StyleSheet } from 'react-native';

export default function RecordingListItem({
  filename,
  onPress,
  isPlaying,
  isPaused,
}) {
  // Animated value for pause blinking
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPaused) {
      // Start smooth alternating color pulse
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: false,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      // Stop and reset when not paused
      fadeAnim.stopAnimation();
      fadeAnim.setValue(0);
    }
  }, [isPaused]);

  // Interpolate background color between normal + highlight
  const animatedBackground = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2c1f5d', '#6e4cff'], // unselected → playing color
  });

  return (
    <Animated.View
      style={[
        styles.container,
        isPlaying && styles.playingContainer,
        isPaused && { backgroundColor: animatedBackground },
      ]}
    >
      <TouchableOpacity onPress={onPress}>
        <Text
          style={[
            styles.text,
            isPlaying && styles.playingText,
            isPaused && styles.pausedText,
          ]}
        >
          {filename.split('/').pop()}
        </Text>
      </TouchableOpacity>
    </Animated.View>
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
    fontWeight: '700',
  },

  pausedText: {
    opacity: 0.85,
  },
});
