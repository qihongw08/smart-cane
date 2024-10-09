import React, { useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MapView from 'react-native-maps';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const SmartCaneScreen = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    'ArialRoundedBold': require('../assets/fonts/Arial Rounded Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.topContainer}>
        <Image
          source={require('../assets/images/cane.jpg')}
          style={styles.caneImage}
        />
        <View style={styles.statsContainer}>
          <StatItem icon="heart" label="Heart Rate" value="105" unit="min"/>
          <StatItem icon="fire" label="Steps Today" value="742" unit="steps" />
        </View>
      </View>
      <BatteryLevel percentage={60} />
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('Navigate to next screen')}
      >
        <Text style={styles.buttonText}>Next Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const StatItem = ({ icon, label, value, unit }) => (
  <View style={styles.statItem}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>
      {icon === 'heart' ? '❤️' : '🔥'} {value}
      <Text style={styles.statUnit}>{unit}</Text>
    </Text>
  </View>
);

const BatteryLevel = ({ percentage }) => (
  <View style={styles.batteryContainer}>
    <Text style={styles.batteryLabel}>Battery Level</Text>
    <View style={styles.batteryBar}>
      <View style={[styles.batteryFill, { width: `${percentage}%` }]} />
    </View>
    <Text style={styles.batteryPercentage}>{percentage}%</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  caneImage: {
    width: 175,
    height: 300,
    resizeMode: 'contain'
  },
  statsContainer: {
    flex: 1,
    marginLeft: 20,
  },
  statItem: {
    marginBottom: 50,
  },
  statLabel: {
    fontSize: 16,
    color: 'gray',
    fontFamily: 'ArialRoundedBold',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'ArialRoundedBold',
    color: 'rgba(239, 19, 32, 0.64)'
  },
  statUnit: {
    fontSize: 14,
    fontFamily: 'ArialRoundedBold',
    color: 'rgba(239, 19, 32, 0.64)',
  },
  batteryContainer: {
    marginBottom: 20,
  },
  batteryLabel: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
    fontFamily: 'ArialRoundedBold',
  },
  batteryBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  batteryFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  batteryPercentage: {
    textAlign: 'right',
    marginTop: 5,
    fontFamily: 'ArialRoundedBold',
  },
  mapContainer: {
    flex: 1,
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'ArialRoundedBold',
  },
});

export default SmartCaneScreen;