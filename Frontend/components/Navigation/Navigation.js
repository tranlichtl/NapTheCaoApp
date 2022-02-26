import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign ,FontAwesome,Fontisto  } from "@expo/vector-icons";
import Home from '../screen/Home';
import TopUp from '../screen/tab/TopUp';
import Withdraw from '../screen/tab/Withdraw';

const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
    return (
        <Tab.Navigator
          initialRouteName="Login"
          activeColor='#FF7F50'
          labelStyle={{ fontSize: 12 }}
          barStyle={{ backgroundColor: '#f5f5f5' }}
        >

          <Tab.Screen name="Home" component={Home} 
           options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <AntDesign name="home" size={24} color={color}  />
            ),
          }}
            
          >  
          </Tab.Screen>
          <Tab.Screen name='TopUp' component={TopUp}
           options={{
            tabBarLabel: 'Nạp Thẻ',
            tabBarIcon: ({color}) => (
              <Fontisto name="shopping-basket-add" size={20} color={color} />
            ),
           
          }}
          />
          <Tab.Screen name='Withdraw' component={Withdraw}
           options={{
            tabBarLabel: 'Rút Tiền',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="money" size={24} color={color} />
            ),
          }}
          />
        </Tab.Navigator>
    )
}

export default Navigation