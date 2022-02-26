import React from 'react';
import { View ,Keyboard ,TouchableWithoutFeedback ,StyleSheet,KeyboardAvoidingView,ScrollView,Text} from 'react-native';
import HeaderBar  from "../../HeaderBar";
import {
    Select,
    VStack,
    Stack,
    CheckIcon,
    Input,
    Button,
  } from "native-base";
  import { Table, Row } from 'react-native-table-component';
const Withdraw = () => {
    // static navigationOptions = {

    // }
    let [service, setService] = React.useState("");
    const state={ 
      tableHead : ['Thời gian','Số tài khoản',"Ngân hàng", 'Số tiền', 'Trạng thái'],
      tableData:[[]],
      widthArr: [100, 100, 100, 100, 100]
    }
    return(
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        >
          <HeaderBar></HeaderBar>
           <ScrollView >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                
                  
                    <View style={styles.form}>
                        <VStack alignItems="center" space={4}>
                        <Select
                            style={{ height:40,
                              backgroundColor:"#d9f99d",
                              paddingHorizontal:10,
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontSize:20,}}
                            selectedValue={service}
                            minWidth="95%"
                            accessibilityLabel="Choose Service"
                            placeholder="Ngân Hàng"
                            _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />,
                            }}
                            mt={1}
                            onValueChange={(itemValue) => setService(itemValue)}
                        >
                            <Select.Item label="MBBank" value="mbBank" />
                            <Select.Item label="ViettinBank" value="viettinBank" />
                            <Select.Item label="TechcomBank" value="techcomBank" />
                            <Select.Item label="AgriBank" value="agriBank" />
                        </Select>
                        </VStack>
            
            <Stack
                style={{marginTop:4,width:"95%",marginLeft:"2.5%"}}
                space={1}
                w={{
                    base: "75%",
                    md: "25%",
                }}
                >
                    <Input variant="outline" placeholder="Số Tài Khoản" keyboardType="numeric" style={styles.input}/>
                    <Input variant="outline" placeholder="Chủ Tài Khoản" style={styles.input} />
                    <Input variant="outline" placeholder="Số Tiền" keyboardType="numeric" style={styles.input}/>
            </Stack>
            </View>
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
                <Button size="lg" bg="lime.500" onPress={() =>{
                    
                    }}>
                Rút Tiền 
              </Button>
            </Stack>
          </View>
        </TouchableWithoutFeedback>
        
        <Text style={styles.headtable}>Lịch sử rút tiền</Text>
        <View style={styles.history}>
       <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  state.tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
            </View>
        </ScrollView>
      </View>
        </ScrollView>
      </KeyboardAvoidingView>
  
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:"#fdba74",
    },
    inner: {
      flex: 1,
    },
    form:{
      backgroundColor:"#ea580c",
      width:"80%",
      marginLeft:"10%",
      borderRadius:15,
      borderWidth:2,
      paddingBottom:8,
    
    },
    input:{
      height:40,
      fontSize:20,
      backgroundColor:"#d9f99d",
    },

    headtable:{
      fontSize:25,
      textAlign:"center"
    },
    history: { flex: 1, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
  });
export default Withdraw;