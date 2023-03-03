// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserAuthContent} from './contextHelper';
import Auth from './src/Auth/Login';
import Approval from './src/Home/Approval';
import Detail from './src/Home/Detail';

const Stack = createNativeStackNavigator();

function App() {
  const [auth, setAuth] = React.useState(false);
  const AuthContext = React.useMemo(() => {
    return {
      login: () => {
        setAuth(true);
      },
      logOut: () => {
        setAuth(false);
      },
    };
  }, []);
  const getUserAuth = async () => {
    try {
      const value = await AsyncStorage.getItem('@access_token');
      if (value !== null) {
        setAuth(true);
        // navigation.navigate('Dashboard');
      } else {
        setAuth(false);
        setAuth(false);
        // navigation.navigate('AuthRouteStack');
      }
    } catch (e) {
      // error reading value
    }
  };

  React.useEffect(() => {
    getUserAuth();
  }, []);
  return (
    <NavigationContainer>
      <UserAuthContent.Provider value={AuthContext}>
        {auth ? (
          <Stack.Navigator>
            <Stack.Screen name="Approval" component={Approval} />
            <Stack.Screen name="Detail" component={Detail} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Auth" component={Auth} />
          </Stack.Navigator>
        )}
      </UserAuthContent.Provider>
    </NavigationContainer>
  );
}

export default App;
