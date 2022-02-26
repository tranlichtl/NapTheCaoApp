import React, { useState,useContext ,} from 'react';
import { Image, StyleSheet, Text, View,ImageBackground } from 'react-native';
import Background from "../assets/money.png";
import { httpClient } from './customHooks/httpClient';
import MainContext from './Context/MainContext';
export default  HeaderBar =()=> {
  const [money,setMoney]=useState('');
  const { APIKEY, ACCOUNT, token } = useContext(MainContext)
  httpClient.get(`https://card-exchange.herokuapp.com/api/v1/user/money/`,token)
  .then(response => {
    setMoney(Object.values(response.data))
  })
  .catch(error => {
    console.log("error ", error.response)
  })
  return(
        <View style={styles.header}>
          
            <ImageBackground 
                    source={Background}
                    resizeMode="cover"
                    style={styles.background}>
                 <Text
                    style={styles.input}
                    placeholder="Money"
                    defaultValue={money}
                >{money}
                </Text>
             </ImageBackground>
         
         
        </View>
  );
}

const styles = StyleSheet.create({

header:{
  marginTop:20,
  flexDirection: "row",
  justifyContent: "center",
  alignItems:"center",
  backgroundColor:'#ef4444',
  marginBottom:50,
},
input:{
    marginTop:13,
    textAlign: "center",
    fontSize:24,
},

background:{
  width:"100%",
  height:50,
}
});