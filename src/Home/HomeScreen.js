// In App.js in a new project

import * as React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {UserAuthContent} from '../../contextHelper';
import employeeData from '../JSON/employeeData.json';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen() {
  const navigate = useNavigation();
  const {logOut} = React.useContext(UserAuthContent);
  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const clone = [...employeeData];
    const search = clone.filter(i => i.category.includes('medical'));
    setData(search);
  }, []);
  const Item = ({item}) => {
    const isRejected = Boolean(item.status.includes('approved'));
    const handlePress = () => {
      navigate.navigate('Detail', {...item});
    };
    return (
      <TouchableOpacity
        onPress={handlePress}
        style={{padding: 10, backgroundColor: '#9cbff7'}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          employee_number: {item.employee_number}
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          name: {item.employee_name}
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          category: {item.category}
        </Text>
        <Text
          style={{
            color: isRejected ? 'red' : 'green',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          status {item.status}
        </Text>
      </TouchableOpacity>
    );
  };
  const handleSearch = text => {
    setSearch(text);
    setTimeout(() => {
      const clone = [...employeeData];
      const search = clone.filter(i => i.employee_name.includes(text));
      setData(search);
    }, 500);
  };
  const tabMenu = [
    {
      category: 'medical',
    },
    {
      category: 'optical',
    },
    {
      category: 'transport',
    },
    {
      category: 'dental',
    },
  ];
  const handleTab = item => {
    const clone = [...employeeData];
    const search = clone.filter(i => i.category.includes(item.category));
    setData(search);
  };
  const handleLogOut = async () => {
    logOut();
    await AsyncStorage.clear();
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <Button title="LogOut" onPress={handleLogOut} />
        <View
          style={{
            margin: 20,
          }}>
          <Text>Search By Employee Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleSearch}
            value={search}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          {tabMenu?.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => handleTab(item)}
                style={{padding: 10, backgroundColor: 'green'}}
                key={index}>
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}>
                  {item.category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{padding: 10, flex: 1}}>
          <FlatList
            ItemSeparatorComponent={<View style={{height: 20}} />}
            data={data}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item?.employee_number}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
});
export default HomeScreen;

// {flex: 1, alignItems: 'center', justifyContent: 'center'}
