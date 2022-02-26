import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screen/Login';
import SignUp from '../screen/SignUp';
import Navigation from '../Navigation/Navigation';

const AuthStackNav = createStackNavigator();

const AuthStack = () => {
    return (
    <AuthStackNav.Navigator 
      >
        <AuthStackNav.Screen name="Login"  component={Login}/>
        <AuthStackNav.Screen name="SignUp" component={SignUp}/>
    
    </AuthStackNav.Navigator>
    )
}

export default AuthStack