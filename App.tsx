import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';

import React from 'react';
import { View, StatusBar } from 'react-native';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  useFonts,
} from '@expo-google-fonts/roboto';

import Routes from './src/routes';
import AppProvider from './src/hooks';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <StatusBar />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
