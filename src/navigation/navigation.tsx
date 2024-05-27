import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StackParameterList} from './type';
import Home from '@screens/home';
import Cart from '@screens/cart';
import SingleItem from '@screens/singleItem';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';

// const AuthStack = createStackNavigator<StackParameterList>();
const AuthStack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer independent={true}>
      <StatusBar backgroundColor={'#ffff'} barStyle={'dark-content'} />
      <AuthStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'HOME' as keyof StackParameterList}>
        <AuthStack.Screen
          name={'HOME' as keyof StackParameterList}
          component={Home}
        />
        <AuthStack.Screen
          name={'CART' as keyof StackParameterList}
          component={Cart}
        />
        <AuthStack.Screen
          name={'SINGLEITEM' as keyof StackParameterList}
          component={SingleItem}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
