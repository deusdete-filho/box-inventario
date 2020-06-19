import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';

import React from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import {
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
  useFonts,
} from '@expo-google-fonts/roboto';

import Routes from './src/routes';
import AppProvider from './src/hooks';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  if (!fontsLoaded) {
    return <ActivityIndicator style={{ flex: 1 }} color="#000" />;
  }
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#eee" />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#eee' }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
