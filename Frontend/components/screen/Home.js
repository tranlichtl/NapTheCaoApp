import React, { useState, useContext,  } from 'react';
import { Text, View } from 'react-native';
import {
    Stack,
    Button,
  } from "native-base";
import HeaderBar  from "../HeaderBar";
import DisscontTable from "../DisscountTable";

const Home = ({navigation}) => {
 
    return(
        <View style={{ flex: 1, alignItems: 'center' ,backgroundColor:"#fdba74"}} >
            <HeaderBar></HeaderBar>
            <DisscontTable></DisscontTable>
            <Stack
                mb="2.5"
                mt="1.5"
                direction={{
                    base: "column",
                    md: "row",
                }}
                space={2}
                mx={{
                    base: "auto",
                    md: "0",
                }}
                >
                <Button size="lg" bg="red.500"  >
                    Đăng Xuất
                </Button>
            </Stack>
        </View>
    )
}
export default Home;