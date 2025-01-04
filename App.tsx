/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './src/styles/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigation';

function App(): React.JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1},
});

export default App;
