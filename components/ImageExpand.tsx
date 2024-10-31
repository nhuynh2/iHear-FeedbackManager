import React, { useState } from 'react';
import { Modal, TouchableOpacity, Image, StyleSheet, View } from 'react-native';

const ExpandableImage = ({ imageUrl, style }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      {/* Avatar-styled image that opens the modal when tapped */}
      <TouchableOpacity onPress={handlePress}>
        <Image source={imageUrl} style={style} />
      </TouchableOpacity>

      {/* Modal for expanded image view */}
      {isExpanded && (
        <Modal transparent={true} animationType="fade">
          <TouchableOpacity style={styles.modalBackground} onPress={handlePress}>
            <Image source={imageUrl} style={styles.expandedImage} />
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedImage: {
    width: '80%', // Adjust size as needed
    height: '80%',
    resizeMode: 'contain',
  },
});

export default ExpandableImage;
