import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, CreateScreen } from '../screens';
const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'HomeScreen'}
          screenOptions={{
              headerShown: false
          }}
      >
          <Stack.Screen name="HomeScreen" component={HomeScreen} initialParams = {render=false} />
          <Stack.Screen name="CreateScreen" component={CreateScreen} />

      </Stack.Navigator>
    </NavigationContainer>
      
  )
}

export default HomeStack