// MainLayout.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const MainLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <View style={styles.tabBar}>
        <Link href="/" style={styles.tabBarItem}>
          <Text style={styles.tabBarIcon}>🧭</Text>
          <Text style={styles.tabBarLabel}>Explore</Text>
        </Link>
        <Link href="/Adjustments" style={styles.tabBarItem}>
          <Text style={styles.tabBarIcon}>⚙️</Text>
          <Text style={styles.tabBarLabel}>Adjustments</Text>
        </Link>
        <Link href="/User" style={styles.tabBarItem}>
          <Text style={styles.tabBarIcon}>👤</Text>
          <Text style={styles.tabBarLabel}>Account</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  tabBarItem: {
    alignItems: 'center',
    alignContent: 'center',
  },
  tabBarIcon: {
    fontSize: 24,
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 5,
    color: '#6C757D',
  },
});

export default MainLayout;
