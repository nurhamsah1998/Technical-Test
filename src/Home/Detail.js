// In App.js in a new project

import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Detail(route) {
  const navigate = useNavigation();
  const {
    employee_name,
    category,
    reimbursement_amount,
    description,
    status,
    employee_number,
  } = route?.route?.params;
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 100,
      }}>
      <Text style={{fontSize: 24}}>Number: {employee_number}</Text>
      <Text style={{fontSize: 24}}>Name :{employee_name || ''}</Text>
      <Text style={{fontSize: 24}}>category :{category}</Text>
      <Text style={{fontSize: 24}}>
        {' '}
        reimbursement_amount : {reimbursement_amount}
      </Text>
      <Text style={{fontSize: 24}}>description : {description}</Text>
      <Text style={{fontSize: 24}}> status :{status}</Text>
      <View style={{flexDirection: 'row'}}>
        <Button title="Approve" />
        <Button color="red" title="Reject" />
      </View>
    </View>
  );
}
export default Detail;
