/**
 * Pokédex App
 * Main application entry point with Redux and Navigation integration
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';

// Redux Store
import { persistor, store } from './src/redux/store';

// Navigation
import RootNavigator from './src/routes/RootNavigator';
import { navigationRef } from './src/routes/navigationRef';

// Components
import { Loading } from './src/components/atoms';

// Styles
import { colors } from './src/styles/colors';
import { navigationTheme } from './src/styles/theme';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading fullScreen />} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef} theme={navigationTheme}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor={colors.background}
            />
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
