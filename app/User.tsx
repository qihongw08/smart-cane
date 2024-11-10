import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  EMERGENCY_CONTACT: '@emergency_contact',
  EMERGENCY_MESSAGE: '@emergency_message'
};

const UserPage = () => {
    const [emergencyContact, setEmergencyContact] = useState('');
    const [emergencyMessage, setEmergencyMessage] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Load saved data when component mounts
    useEffect(() => {
        loadSavedData();
    }, []);

    const loadSavedData = async () => {
        try {
            const savedContact = await AsyncStorage.getItem(STORAGE_KEYS.EMERGENCY_CONTACT);
            const savedMessage = await AsyncStorage.getItem(STORAGE_KEYS.EMERGENCY_MESSAGE);
            
            if (savedContact) setEmergencyContact(savedContact);
            if (savedMessage) setEmergencyMessage(savedMessage);
        } catch (error) {
            Alert.alert('Error', 'Failed to load saved emergency contact information');
        }
    };

    const onSubmit = async () => {
        if (!emergencyContact.trim()) {
            Alert.alert('Error', 'Please enter an emergency contact number');
            return;
        }

        setIsSaving(true);
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.EMERGENCY_CONTACT, emergencyContact);
            await AsyncStorage.setItem(STORAGE_KEYS.EMERGENCY_MESSAGE, emergencyMessage);
            
            Alert.alert('Success', 'Emergency contact information saved successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to save emergency contact information');
        } finally {
            setIsSaving(false);
        }
    };
    
    return (
        <ScrollView style={styles.container}>
            <LinearGradient
                colors={['#4A90E2', '#357ABD']}
                style={styles.header}>
                <Text style={styles.title}>Smart Step</Text>
            </LinearGradient>

            <View style={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Emergency Settings</Text>
                    <Text style={styles.label}>Emergency Contact Number</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmergencyContact}
                        value={emergencyContact}
                        placeholder="Enter emergency contact number"
                        keyboardType="phone-pad"
                        placeholderTextColor="#666"
                    />

                    <Text style={styles.label}>Emergency Message</Text>
                    <TextInput
                        style={[styles.input, styles.messageInput]}
                        onChangeText={setEmergencyMessage}
                        value={emergencyMessage}
                        placeholder="Enter message to be sent in case of emergency"
                        multiline={true}
                        numberOfLines={4}
                        placeholderTextColor="#666"
                    />
                </View>

                <TouchableOpacity
                    onPress={onSubmit}
                    activeOpacity={0.8}
                    disabled={isSaving}
                    style={[styles.submitButton, isSaving && styles.submitButtonDisabled]}>
                    <LinearGradient
                        colors={['#FF4B4B', '#DC3545']}
                        style={styles.submitGradient}>
                        <Text style={styles.submitText}>
                            {isSaving ? 'Saving...' : 'Save Emergency Settings'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        padding: 20,
        paddingTop: 60,
        height: 160,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: 'white',
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        marginTop: 8,
    },
    content: {
        padding: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#E1E1E1',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#FAFAFA',
        marginBottom: 16,
    },
    messageInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    submitButton: {
        marginTop: 8,
        marginBottom: 40,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    submitButtonDisabled: {
        opacity: 0.7,
    },
    submitGradient: {
        padding: 16,
        alignItems: 'center',
    },
    submitText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default UserPage;