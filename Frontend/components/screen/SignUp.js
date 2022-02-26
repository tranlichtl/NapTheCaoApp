import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import React, { useState, useContext, useCallback } from 'react';
import {  StyleSheet, Text, TextInput,  View ,TouchableOpacity,Image,KeyboardAvoidingView ,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native';
import Logo from "../../assets/logo.png";
import { httpClient } from '../customHooks/httpClient';
import MainContext from '../Context/MainContext';
import { Button } from 'native-base';

export default function Sigin({ navigation }){
  const { loginCheck, setLoginCheck, } = useContext(MainContext)
    const [isPasswordShow,setPasswordShow]=useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const logincheck = useCallback(() => {
      setLoginCheck(false);
  }, [loginCheck])

  const onSubmit = () => {
    const data = {
      username: username,
      password: password,
      phone: phone,
      money:0
    }
    setLoading(true);
    httpClient.post(`https://card-exchange.herokuapp.com/api/v1/register`, data, null)
    .then(response => {
      Alert.alert("Đăng ký thành công");
      setLoading(false);
    })
    .catch(error => {
      console.log("Sign Up Error", error);
      Alert.alert("Đăng ký thất bại");
      setLoading(false);
    })
  }

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
        
             <Image 
              style={styles.image}
              source={Logo}/>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
             <View style={styles.form}>
           <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
                    <Feather 
                    name="user"
                    size={22}
                    style={{marginRight:10}}
                    ></Feather>
                     <TextInput 
                        style={styles.inputText}
                        onChangeText={(value) => setUsername(value)}
                        placeholder="Tên đăng nhập"
                    ></TextInput>
            </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputSubContainer}>
                    <Feather 
                    name="lock"
                    size={22}
                    style={{marginRight:10}}
                    ></Feather>
                    <TextInput 
                        style={styles.inputText}
                        secureTextEntry={isPasswordShow ? false:true}
                        onChangeText={(value) => setPassword(value)}
                        placeholder="Password"
                    ></TextInput>
                     <Feather 
                    name={isPasswordShow ? "eye":"eye-off"}
                    size={22}
                    style={{marginRight:10}}
                    onPress={()=>setPasswordShow(!isPasswordShow)}
                    ></Feather>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputSubContainer}>
                    <Feather 
                    name="phone"
                    size={22}
                    style={{marginRight:10}}
                    ></Feather>
                    <TextInput 
                        style={styles.inputText}
                        placeholder="Phone"
                        onChangeText={(value) => setPhone(value)}
                        keyboardType="numeric"
                    ></TextInput>

              </View>
            </View>
            </View>
        </TouchableWithoutFeedback>
            <Button style={styles.button}
            isLoading={loading}
            onPress={()=>{
              (username=='' || password=='' || phone=='')?(Alert.alert("Thiếu thông tin")):onSubmit()
            }}>
                <Text style={styles.buttonText}>Đăng Ký</Text>
            </Button>

   
  <StatusBar style="auto" />
  </KeyboardAvoidingView>
);
}


const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor:"coral",
    alignItems: 'center',
},
image: {
    width:150,
    height:150,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius:20,
    marginTop:"10%",
    marginBottom:"10%",
},
inputContainer:{
    height:40,
    width:300,
    backgroundColor:"lightgray",
    paddingHorizontal:10,
    marginHorizontal:20,
    borderRadius:8,
    borderWidth:0.5,
    justifyContent: 'center',
    flexDirection: "row",
    alignItems: 'center',
    marginBottom:10,
    
  },
  inputSubContainer:{
    justifyContent: 'center',
    flexDirection: "row",
    alignItems: 'center',
  },
  inputText:{
    flex:1,
    fontSize:20,
    textAlignVertical:"center",
  },
  button:{
    backgroundColor:"lightgreen",
    borderRadius:8,
    height:40,
    width:300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
  },
  buttonText:{
    fontSize:20,
    },
});