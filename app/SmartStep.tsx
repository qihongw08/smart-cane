import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
// import sendSMS from '@/api/sosService';
import { Link } from 'expo-router';

const SavvyStepperMain = () => {
  const handleButtonClick = () => {
    //sendSMS("3476517362");
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4A90E2', '#357ABD']}
        style={styles.header}
      >
        <Text style={styles.title}>Smart Step</Text>
        <View style={styles.statusContainer}>
          <View style={styles.statusDot} />
          <Text style={styles.status}>Connected</Text>
        </View>
        <TouchableOpacity
          onPress={handleButtonClick}
          style={styles.sosButton}
          activeOpacity={0.8} >
          <View style={styles.sosInner}>
            <Text style={styles.sosText}>SOS</Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
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
    </View>
  );
};

const imageMap: { [key: string]: ImageSourcePropType } = {
  steps: require('../assets/images/fire.png'),
};

const StatItem: React.FC<StatItemProps> = ({ image, label, value, unit }) => {
  const imageSource = imageMap[image];
  return (
    <View style={styles.statItem}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statusContainer}>
        <Image source={imageSource} style={styles.icons}/> 
        <Text style={styles.statValue}>
          {value}
          <Text style={styles.statUnit}> {unit}</Text>
        </Text>
      </View>
    </View>
  );
};

type StatItemProps = {
  image: string;  
  label: string;
  value: string | number;
  unit?: string; 
};

type TabBarItemProps = {
  icon: string;  
  label: string;
};

const TabBarItem : React.FC<TabBarItemProps> = ({ icon, label }) => (
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
    alignItems: 'stretch',
    backgroundColor: '#F8F9FA'
  },
  header: {
    padding: 20,
    paddingTop: 50,
    height: 214,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
    letterSpacing: 0.5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ADE80',
    marginRight: 8,
  },
  status: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    flexDirection: 'row',
    padding: 20,
    position: 'relative',
    height: 239,
    borderRadius: 20,
    margin: 16,
    marginTop: -10,
  },
  caneImage: {
    width: 68.05,
    height: 305.13,
    resizeMode: 'contain',
    position: 'absolute',
    top: -20,
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
  sosButton: {
    position: 'absolute',
    top: 100,
    right: 30,
    zIndex: 1000,
  },
  sosInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#DC3545',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  sosText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },
  mapContainer: {
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: 'white',
    width: 324,
    height: 250,
    marginBottom: 30,
    marginTop: 30,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
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
    alignContent: 'center'
  },
  tabBarIcon: {
    fontSize: 24,
    alignSelf: 'center'
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 5,
    color: '#6C757D',
    alignSelf: 'center'
  }
});

export default SavvyStepperMain;