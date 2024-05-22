import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateForm from './CreateForm';
import CreateForm1 from './CreateForm1';
import CreateForm3 from './CreateForm3';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateForm">
        <Stack.Screen name="CreateForm" component={CreateForm} />
        <Stack.Screen name="CreateForm1" component={CreateForm1} />
        <Stack.Screen name="CreateForm3" component={CreateForm3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
