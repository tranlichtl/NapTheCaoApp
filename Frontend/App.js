import React, { useState, useEffect } from 'react';
import {
  NativeBaseProvider,
  extendTheme,
} from "native-base";

import { NavigationContainer } from '@react-navigation/native';
import { isExpired } from "react-jwt";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainContext from './components/Context/MainContext';
import AuthStack from './components/AuthStack/AuthStack';
import Navigation from './components/Navigation/Navigation';


// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const APIKEY = "YDUOCLTLCAHGNYBDRDVTIUPQFSBETYWL"
const ACCOUNT = "0379797226"

// extend the theme
export const theme = extendTheme({ config });

const App = () => {
  const [token, setToken] = useState(AsyncStorage.getItem('token'));
  const [loginCheck, setLoginCheck] = useState(token === null || isExpired(token))
  return ( 
    // <Login></Login>
    <MainContext.Provider
    value={{
      APIKEY,
      ACCOUNT,
      token,
      setToken,
      loginCheck,
      setLoginCheck,
    }}
    >
    <NativeBaseProvider >
      <NavigationContainer>
        { loginCheck ? <AuthStack/> : <Navigation/>}
      </NavigationContainer>
    </NativeBaseProvider>
    </MainContext.Provider>
  );
}

export default App;
