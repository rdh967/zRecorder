/**
 * File: RecordingListItemModal.js
 * Description: Minimal modal component for displaying an options menu for recording list items.
 *              Currently displays a black box in the center of the screen.
 *              Clicking outside the box closes the modal.
 */

import React from "react";
import { Modal, View, TouchableOpacity } from "react-native";

export default function RecordingListItemModal({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* BACKDROP */}
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
        activeOpacity={1}
        onPress={onClose} // closes modal when tapping outside
      >
        {/* BIG BLACK BOX */}
        <View
          style={{
            width: 200,
            height: 200,
            backgroundColor: "black",
          }}
        />
      </TouchableOpacity>
    </Modal>
  );
}
