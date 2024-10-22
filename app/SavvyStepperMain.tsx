import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import MapView from 'react-native-maps';

const SavvyStepperMain = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Savvy Stepper</Text>
        <Text style={styles.status}>Status: Connected</Text>
      </View>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/cane.jpg')}
          style={styles.caneImage}
        />
        <View style={styles.statsContainer}>
          <StatItem image="heart" label="Heart Rate" value="105" unit="min"/>
          <StatItem image='steps' label="Steps Today" value="742" unit="steps" />
        </View>
      </View>
      <BatteryLevel percentage={60} />
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 42.3394,
            longitude: -71.0886,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        />
      </View>
      <View style={styles.tabBar}>
        <TabBarItem icon="🧭" label="Explore" />
        <TabBarItem icon="⚙️" label="Adjustments" />
        <TabBarItem icon="👤" label="Account" />
      </View>
    </View>
  );
};

// Image mapping for static images
const imageMap: { [key: string]: ImageSourcePropType } = {
  steps: require('../assets/images/fire.png'),
};

const StatItem: React.FC<StatItemProps> = ({ image, label, value, unit }) => {
  const imageSource = imageMap[image];
  return (
  <View style={styles.statItem}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>
      <Image source={imageSource} style={styles.icons}/> 
      {value}
      <Text style={styles.statUnit}>{unit}</Text>
    </Text>
  </View>
  )};

type StatItemProps = {
  image: string;  
  label: string;
  value: string | number;
  unit?: string; 
};

const BatteryLevel = ({ percentage }) => (
  <View style={styles.batteryContainer}>
    <Text style={styles.batteryLabel}>Battery Level</Text>
    <View style={styles.batteryBar}>
      <View style={[styles.batteryFill, { width: `${percentage}%` }]} />
    </View>
    <Text style={styles.batteryPercentage}>{percentage}%</Text>
  </View>
);

const TabBarItem = ({ icon, label }) => (
  <View style={styles.tabBarItem}>
    <Text style={styles.tabBarIcon}>{icon}</Text>
    <Text style={styles.tabBarLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  header: {
    backgroundColor: '#6998D6',
    padding: 20,
    paddingTop: 50,
    height: 214
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  status: {
    fontSize: 16,
    color: 'white',
  },
  content: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    position: 'relative',
    height: 239
  },
  caneImage: {
    width: 68.05,
    height: 305.13,
    resizeMode: 'contain',
    position: 'absolute',
    top: -50,
    paddingRight: 20,
    transform: [{rotate: '10deg'}, {scaleX: -1}, {translateX: -50}, {translateY: -30}]
  },
  statsContainer: {
    flex: 1,
    marginLeft: 200,
  },
  icons: {
    width: 22,
    height: 25,
    marginBottom: 5
  },
  statItem: {
    marginBottom: 20,
  },
  statLabel: {
    fontSize: 15,
    color: 'gray',
  },
  statValue: {
    fontSize: 35,
    color: '#FF6B6B',
  },
  statUnit: {
    fontSize: 15,
    color: '#FF6B6B'
  },
  batteryContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: 'white',
    paddingBottom: 20,
    height: 68
  },
  batteryLabel: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  batteryBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  batteryFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  batteryPercentage: {
    textAlign: 'right',
    marginTop: 5,
  },
  mapContainer: {
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: 'white',
    width: 324,
    height: 213,
    marginBottom: 30
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  tabBarItem: {
    alignItems: 'center',
  },
  tabBarIcon: {
    fontSize: 24,
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default SavvyStepperMain;