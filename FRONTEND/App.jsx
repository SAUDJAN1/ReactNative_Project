import React from 'react'
import Home from './src/screens/HomeScreen'
import Login from './src/screens/LoginScreen'
import Register from './src/screens/RegisterScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='home' screenOptions={{headerShown: false}}>
          <Stack.Screen name='home' component={Home} />
          <Stack.Screen name='login' component={Login} />
          <Stack.Screen name='register' component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}


export default App;