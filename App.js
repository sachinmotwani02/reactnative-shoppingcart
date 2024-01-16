import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import HomeStack from './src/navigation/HomeStack';
import { useFonts } from 'expo-font';
import { BottomTabs } from './src/navigation/BottomNav';
import { Provider } from 'react-redux';
import store from './src/store/store';

const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,

  colors: {
    primary: 'rgb(58, 90, 175)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(219, 225, 255)',
    onPrimaryContainer: 'rgb(0, 23, 75)',
    secondary: 'rgb(127, 86, 0)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: '#000',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(244, 243, 251)',
      level2: 'rgb(238, 238, 249)',
      level3: 'rgb(232, 233, 246)',
      level4: 'rgb(231, 232, 245)',
      level5: 'rgb(227, 229, 244)',
    },
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'Manrope-Light': require('./assets/fonts/Manrope-Light.ttf'),
    'Manrope-Medium': require('./assets/fonts/Manrope-Medium.ttf'),
    'Manrope-Regular': require('./assets/fonts/Manrope-Regular.ttf'),
    'Manrope-SemiBold': require('./assets/fonts/Manrope-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
