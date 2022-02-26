import { Feather } from '@expo/vector-icons';
import { useState, useContext, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {  StyleSheet, Text, TextInput, View ,TouchableOpacity ,KeyboardAvoidingView,Image ,TouchableWithoutFeedback,Keyboard, Alert,ActivityIndicator} from 'react-native';
import MainContext from '../Context/MainContext';
import { httpClient } from '../customHooks/httpClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from "../../assets/logo.png";
import { Button } from 'native-base';


const Login = ( {navigation} ) => {
  const { loginCheck, setLoginCheck, token, setToken } = useContext(MainContext)
  const [isPasswordShow,setPasswordShow]=useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginClick = useCallback(() => {
    setLoginCheck(false);
}, [loginCheck])

  const login = () => {
    const data = {
      username: username,
      password: password
    }
    setLoading(true);
    httpClient.post(`https://card-exchange.herokuapp.com/api/v1/authenticate`, data)
            .then(response => {
              setToken(response.data.jwttoken);
              AsyncStorage.setItem('token', response.data.jwttoken);
              loginClick();
            })
            .catch(error => {
              setLoading(false);
              console.log(error);
              Alert.alert("Sai thông tin đăng nhập");
            })
  }
  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.form}>
             <Image 
              style={styles.image}
              source={Logo}/>
            <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
                    <Feather 
                    name="user"
                    size={22}
                    style={{marginRight:10}}
                    ></Feather>
                     <TextInput 
                        style={styles.inputText}
                        placeholder="Tên đăng nhập"
                        onChangeText={(value) => setUsername(value)}
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
                        placeholder="Password"
                        onChangeText={(value) => setPassword(value)}
                    ></TextInput>
                     <Feather 
                    name={isPasswordShow ? "eye":"eye-off"}
                    size={22}
                    style={{marginRight:10}}
                    onPress={()=>setPasswordShow(!isPasswordShow)}

                    
                    ></Feather>
              </View>
              </View>
              </View>
          </TouchableWithoutFeedback>
            <View >
                <Button  
                style={styles.button}
                isLoading={loading}
                onPress={()=>{
                  (username=='' || password=='')  ? (Alert.alert("Thiếu thông tin")):(login());
                  
                 
                }}
                
                >
                    <Text style={styles.buttonText}>Đăng Nhập</Text>
                </Button>
                <TouchableOpacity  
                style={styles.button}
                onPress={() =>{
                    navigation.navigate("SignUp")
                  }
                  }>
                      <Text style={styles.buttonText}>Đăng Ký</Text>
                  </TouchableOpacity>
          </View>
          <View >
                <TouchableOpacity  
                onPress={() =>{
                }
                }>
                    <Text style={styles.buttonText}>Quên mật khẩu?</Text>
                </TouchableOpacity>
               
          </View>
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
  form:{
    alignItems: 'center',
  },
  image: {
    width:150,
    height:150,
    justifyContent: "center",
    alignItems: 'center',
    borderRadius:20,
    marginBottom:"10%",
    marginTop:"10%",
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
  inputText:{
    flex:1,
    fontSize:20,
    textAlignVertical:"center",
  },
});
export default Login;