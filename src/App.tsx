import React from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Login from './screens/login';
import Stops from './screens/stops';
import StopRecord from './screens/stopRecord';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';

const Stack = createStackNavigator();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000' }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Stops' component={Stops} />
          <Stack.Screen
            name='StopRecord'
            component={StopRecord}
            options={({ navigation }) => ({
              headerShown: true,
              headerTransparent: true,
              title: 'Registro de parada',
              headerTintColor: 'black',
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
                  <Icon name='arrow-left' color='green' style={tw`text-2xl font-normal`}/>
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;