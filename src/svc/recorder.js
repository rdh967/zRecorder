// File: /app/modules/recorder.js
// Description: Handles audio recording using Expo's Audio API. 
// Provides functions to start and stop recordings. stopRecording() returns the URI of the recorded file.

import { Audio } from 'expo-av';

// Module-scoped variable holding the current recording instance.
// Accessible by startRecording() and stopRecording(), tracks the active recording.
let recording = null;

/**
 * Starts audio recording.
 * Returns: nothing
 * Side effects: sets the global `recording` variable.
 */
export async function startRecording() {
  try {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    recording = new Audio.Recording();
    await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await recording.startAsync();
    console.log('Recording started');
  } catch (err) {
    console.error('Failed to start recording', err);
  }
}

/**
 * Stops the current audio recording.
 * Returns: URI of the recorded file (string)
 * Side effects: stops and unloads `recording`, then resets it to null.
 */
export async function stopRecording() {
  try {
    if (!recording) {
      console.warn('No recording in progress');
      return null;
    }

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped, file saved at', uri);

    recording = null;

    return uri;
  } catch (err) {
    console.error('Failed to stop recording', err);
    return null;
  }
}
