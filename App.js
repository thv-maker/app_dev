import { verifyInstallation } from 'nativewind';
import React from 'react';
import { View } from 'react-native';
import AppNavigationNi from './src/navigations';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/app/store';

// For Android emulator: 10.0.2.2 maps to host machine localhost.
// This makes the mobile app talk to the backend running on the same computer.
global.API_BASE_URL = global.API_BASE_URL || 'http://10.0.2.2:8000/api';

const App = () => {
  verifyInstallation();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View className="flex-1">
          <AppNavigationNi />
        </View>
      </PersistGate>
    </Provider>
  );
};
export default App;