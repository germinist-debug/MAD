import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './frontend/navigation/AppNavigator';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.fullScreenLogo}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  splashContainer: { flex: 1, backgroundColor: '#fff' },
  fullScreenLogo: { width, height },
});

export default App;
