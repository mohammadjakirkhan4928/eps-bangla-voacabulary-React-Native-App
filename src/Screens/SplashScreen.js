// SplashScreen.js

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Your splash screen content */}
      <Image
        source={require('../../assets/logo.png')} // Replace with your app's logo
        style={styles.logo}
      />
      <Text style={styles.title}>Eps-Bangla Vocabulary</Text>
      {/* Optional: Add loading indicators or animations */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color for splash screen
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default SplashScreen;
