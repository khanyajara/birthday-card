import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CardScreen from './components/birthdayCard/card';  // Your card screen
import SavedCards from './components/birthdayCard/savedCards';
import AppNavigator from './components/Tabsbottom'; // Make sure you're importing the right component

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
       <View style={styles.App}>
      <Stack.Navigator 
      initialRouteName='Tabs'
      screenOptions={{headerShown: false}}>
        <Stack.Screen name="Card" component={CardScreen} options={{ title: 'Birthday Card'}} />
        <Stack.Screen name="SavedCards" component={SavedCards} options={{ title: 'Saved'}}/>
        <Stack.Screen name="Tabs" component={AppNavigator} options={{ title: 'Tabs'}}/> 
      </Stack.Navigator></View>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  App: {
    flex: 1,
    backgroundColor: 'black',
    height:'auto'
  },
  });

