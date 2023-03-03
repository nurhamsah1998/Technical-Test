// In App.js in a new project

import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginData from '../JSON/loginData.json';
import {UserAuthContent} from '../../contextHelper';

function Auth() {
  const {login} = React.useContext(UserAuthContent);
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleLogin = async () => {
    try {
      const isAuth = loginData.find(
        i => i.username.includes(userName) && i.password.includes(password),
      );
      if (isAuth) {
        await AsyncStorage.setItem('@access_token', 'Token');
        login();
      } else {
        Alert.alert('WRONG!!');
        console.log('asd');
      }
    } catch (e) {
      // saving error
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 20,
        }}>
        <Text>Username: admin</Text>
        <Text>Username: admin</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setUserName(text)}
          value={userName}
          placeholder="username"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          value={password}
          placeholder="password"
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
});

export default Auth;
