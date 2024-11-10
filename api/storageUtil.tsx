import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  EMERGENCY_CONTACT: '@emergency_contact',
  EMERGENCY_MESSAGE: '@emergency_message'
};

export const getEmergencyContact = async () => {
  try {
    const contact = await AsyncStorage.getItem(STORAGE_KEYS.EMERGENCY_CONTACT);
    return contact || '';
  } catch (error) {
    console.error('Failed to load emergency contact:', error);
    return '';
  }
};

export const getEmergencyMessage = async () => {
  try {
    const message = await AsyncStorage.getItem(STORAGE_KEYS.EMERGENCY_MESSAGE);
    return message || '';
  } catch (error) {
    console.error('Failed to load emergency message:', error);
    return '';
  }
};
