// File: /app/svc/storage.js
// Description: Handles file naming and file management for audio recordings.
// Saves recordings in the app's sandboxed documentDirectory. 
// Includes a stub for copying files outside the app (cloud or MediaLibrary).

import * as FileSystem from 'expo-file-system/legacy';


/**
 * Generates a unique filename for a recording.
 * Format: Recording-YYYYMMDD-HHMMSS.m4a
 */
export function generateFilename() {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:.]/g, '');
  return `Recording-${timestamp}.m4a`;
}

/**
 * Moves a file from its current URI to a new URI in the app's document directory.
 * Returns the new URI.
 */
export async function moveFile(currentUri, newFilename) {
  try {
    const newUri = `${FileSystem.documentDirectory}${newFilename}`;
    await FileSystem.moveAsync({
      from: currentUri,
      to: newUri,
    });
    return newUri;
  } catch (err) {
    console.error('Failed to move file', err);
    return null;
  }
}

/**
 * Stub for copying a file outside app storage.
 * Examples:
 * - Cloud storage (Firebase, S3, etc.)
 * - MediaLibrary / shared storage on device
 * 
 * Currently just logs a message. Implement as needed in the future.
 */
export async function copyOutsideAppStorage(uri, filename) {
  console.log(`Stub: copy ${uri} to external storage as ${filename}`);
  // TODO: implement copying to MediaLibrary or cloud storage
  return uri; // returning original URI for now
}
