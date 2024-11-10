import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';

const AdjustmentPage = () => {
    const [selectedMode, setSelectedMode] = useState('M1');
    const [height, setHeight] = useState(30);

    const changeHeight = (value : number) => {
        setHeight(value);
    }

    const saveHeight = () => {
        setHeight(30);
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Smart Step</Text>
                <Text style={styles.subtitle}>Status: placeholder</Text>
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
                {/* Cane Image */}
                <Image
                    source={require('../assets/images/cane.jpg')} // Add your cane image
                    style={styles.caneImage}
                    resizeMode="contain"
                />

                {/* Height Slider */}
                <View style={styles.sliderContainer}>
                    <Slider
                    style={styles.slider}
                    minimumValue={24}
                    maximumValue={36}
                    step={1}
                    minimumTrackTintColor="#4A4A4A"
                    maximumTrackTintColor="#000000"
                    renderStepNumber={true}
                    onValueChange={changeHeight}
                    value={30}
                    />

                    <TouchableOpacity
                        onPress={saveHeight}
                        activeOpacity={0.8}
                        style={[styles.submitButton]}>
                        <Text>Save Height Setting</Text>
                    </TouchableOpacity>
                </View>

                {/* Mode Selector */}
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
        </View>
    );
};

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingHorizontal: 40,
    },
    caneImage: {
        height: 300,
        width: 100,
    },
    sliderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    slider: {
        width: 350, // Make width larger for vertical appearance
        height: 40, // Shorter height since we rotated it
        transform: [{ rotate: '-90deg' }, {translateX: 100}, {translateY: -25}], // Rotate slider
    },
    submitButton: {
        transform: [{translateY: 100}, {translateX: -20}],
        backgroundColor: '#4A90E2',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    modeSelector: {
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: [{ translateX: -80 }],
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        borderRadius: 25,
        padding: 4,
    },
    modeButton: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 20,
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
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        backgroundColor: '#F8F9FA',
        borderTopWidth: 1,
        borderTopColor: '#E1E1E1',
    },
    navItem: {
        alignItems: 'center',
    },
    navItemActive: {
        opacity: 0.7,
    },
    navText: {
        fontSize: 12,
        color: '#4A4A4A',
    },
    navTextActive: {
        color: '#000000',
        fontWeight: '500',
    },
});

export default AdjustmentPage;