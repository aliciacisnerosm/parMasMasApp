import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './components/Home';
import TableView from './components/TableView';
import NewProgram from './components/NewProgram';
import Console from './components/Console';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Tableview" component={TableView} />
          <Stack.Screen name="Programa" component={NewProgram} />
          <Stack.Screen name="Console" component={Console} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
