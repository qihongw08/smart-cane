import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { updateProperty } from '@/api/arduinoService';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import ColorPicker from 'react-native-wheel-color-picker';
const HEIGHT_PROPERTY = 'ceb8083a-e458-4afa-9bf5-870ad35447cc';
const RGB_PROPERTY = '8899946f-4eee-4d86-9db0-879c79da2255';

export default function AdjustmentPage() {
  const [selectedMode, setSelectedMode] = useState('M1');
  const [height, setHeight] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [isColorModalVisible, setIsColorModalVisible] = useState(false);

  const changeHeight = (value: number) => {
    setHeight(value);
  }

  const saveHeight = async () => {
    try {
      updateProperty(HEIGHT_PROPERTY, height);
      Alert.alert('Height Saved', `Height set to ${height} inches`);
    } catch {
      Alert.alert('Something went wrong changing the height');
    }
  }

  const changeColor = async (color: string) => {
    setSelectedColor(color);
  }

  function hexToRgb(hex: string) {
    // Remove the hash (#) if present
    hex = hex.replace(/^#/, '');
  
    // Parse hex into R, G, B values
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return `${r},${g},${b}`;
  }

  const saveColor = async () => {
    setIsColorModalVisible(false);
    try {
      console.log(hexToRgb(selectedColor));
      updateProperty(RGB_PROPERTY, hexToRgb(selectedColor));
      Alert.alert('Color Changed', `Cane color changed to ${selectedColor}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to change cane color');
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Smart Step</Text>
        <Text style={styles.subtitle}>Status: Connected</Text>
        <View style={styles.heightContainer}>
          <Text style={styles.heightTitle}>Height</Text>
          <View style={styles.heightValue}>
            <Text style={styles.heightArrows}>^{'\n'}^</Text>
            <Text style={styles.heightNumber}>{height}"</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Cane Image and Mode Selector */}
        <View style={styles.caneAndModeContainer}>
          <Image
            source={require('../assets/images/cane.jpg')}
            style={styles.caneImage}
            resizeMode="contain"
          />
          <View style={styles.modeSelector}>
            <TouchableOpacity 
              style={[styles.modeButton, selectedMode === 'M1' && styles.modeButtonActive]}
              onPress={() => setSelectedMode('M1')}>
              <Text style={[styles.modeText, selectedMode === 'M1' && styles.modeTextActive]}>M1</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modeButton, selectedMode === 'Stairs' && styles.modeButtonActive]}
              onPress={() => setSelectedMode('Stairs')}>
              <Text style={[styles.modeText, selectedMode === 'Stairs' && styles.modeTextActive]}>Stairs</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Height Slider */}
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={-6}
            maximumValue={6}
            step={1}
            minimumTrackTintColor="#4A4A4A"
            maximumTrackTintColor="#000000"
            onValueChange={changeHeight}
            value={height}
          />

          <TouchableOpacity
            onPress={saveHeight}
            activeOpacity={0.8}
            style={styles.submitButton}>
            <Text style={styles.buttonText}>Save Height Setting</Text>
          </TouchableOpacity>
        </View>

        {/* Color Selection */}
        <TouchableOpacity
          style={styles.colorSelector}
          onPress={() => setIsColorModalVisible(true)}
        >
          <View style={[styles.colorPreview, { backgroundColor: selectedColor }]} />
          <Text style={styles.colorSelectorText}>Select Cane Color</Text>
          <Ionicons name="chevron-forward" size={24} color="#4A4A4A" />
        </TouchableOpacity>
      </View>

      {/* Color Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isColorModalVisible}
        onRequestClose={() => setIsColorModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Cane Color</Text>
            <View style={styles.colorPickerContainer}>
              <ColorPicker
                color={selectedColor}
                onColorChange={changeColor}
                thumbSize={40}
                sliderSize={40}
                noSnap={true}
                row={false}
              />
            </View>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsColorModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveColor}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#9DC3E8',
    padding: 20,
    paddingTop: 60,
    height: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 4,
  },
  heightContainer: {
    position: 'absolute',
    right: 20,
    top: 80,
  },
  heightTitle: {
    fontSize: 24,
    color: '#4A4A4A',
    marginBottom: 4,
  },
  heightValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heightArrows: {
    fontSize: 20,
    color: '#4A4A4A',
    marginRight: 8,
  },
  heightNumber: {
    fontSize: 40,
    color: '#4A4A4A',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  caneAndModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  caneImage: {
    height: 300,
    width: 100,
  },
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  colorSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
  },
  colorPreview: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  colorSelectorText: {
    fontSize: 16,
    color: '#4A4A4A',
    flex: 1,
  },
  modeSelector: {
    flexDirection: 'column',
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    padding: 4,
  },
  modeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 4,
  },
  modeButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  modeText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  modeTextActive: {
    color: '#000000',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  colorPickerContainer: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '45%',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
  },
  modalButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});