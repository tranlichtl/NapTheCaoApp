import React, { useState, useContext,  } from 'react';
import {
    View,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
    Text,
  } from 'react-native';
import {
    Select,
    VStack,
    Stack,
    CheckIcon,
    Input,
    Button,
    Alert,
    HStack,
    IconButton,
    CloseIcon,
    Box,
    Collapse
  } from "native-base";
import  moment from 'moment';
import HeaderBar  from "../../HeaderBar";
import { fontSize } from 'styled-system';
import ViettelError from '../../TopUpError/ViettelError';
import MobifoneError from '../../TopUpError/MobifoneError';
import VinaphoneError from '../../TopUpError/VinaphoneError';
import VietnamMobileError from '../../TopUpError/VietnamMobileError';
import { httpClient } from '../../customHooks/httpClient';
import MainContext from '../../Context/MainContext';
import History from "../../History";

const VIETTEL = "Viettel"
const MOBIFONE = "Mobifone"
const VINAPHONE = "Vinaphone"
const VIETNAMMOBILE = "VietnamMobile"

const TopUp = () => {
  const { APIKEY, ACCOUNT, token } = useContext(MainContext)
    const [service, setService] = useState(VIETTEL)
    const [price, setPrice] = useState('')
    const [serial, setSerial] = useState('')
    const [cardCode, setCardCode] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [showAlert1, setShowAlert1] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const onSerialChange = (value) => {
      setSerial(value)
    }

    const onCardCodeChange = (value) => {
      setCardCode(value)
    }

    const submitCheck = () => {
      if (service === VIETTEL){
        return ViettelError(serial, cardCode)
      } else if (service === MOBIFONE){
        return MobifoneError(serial, cardCode)
      } else if (service === VINAPHONE){
        return VinaphoneError(serial, cardCode)
      } else if (service === VIETNAMMOBILE){
        return VietnamMobileError(serial, cardCode)
      }
    }

    const onSubmit = async () => {
      if (price && !submitCheck()){
        setLoading(true);
        console.log(serial, cardCode)
        let existTranIdCheck = true;
        let transId
        while(existTranIdCheck){
          transId = Math.floor(Math.random() * 100000001)
          let tranIdCheckResponse = await httpClient.get(`https://card-exchange.herokuapp.com/api/v1/input-card/transId/check?transId=${transId}`, token)
          existTranIdCheck = tranIdCheckResponse.data
        }
        let tcsrCall = await httpClient.get(`https://thecaosieure.com/gachthe?account=${ACCOUNT}&cardType=${service}&cardCode=${cardCode}&APIKey=${APIKEY}&transId=${transId}&cardSerial=${serial}&cardAmount=${price}`)
        const tcsrResponse = tcsrCall.data
        const data = {
          seri: serial,
          time: moment().format("YYYY-MM-DDThh:mm:ss"),
          money: price,
          homeNetwork: service,
          status: tcsrResponse.errorCode,
          transID: transId 
        }
        let serverCall = await httpClient.post(`https://card-exchange.herokuapp.com/api/v1/input-card/`, data, token)
        const serverResponse = serverCall.data
        if(serverCall.status === 200){
          setLoading(false);
          setShowAlert1(true)
        }
      } else {
        setShowAlert(true)
      }
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
                  style={styles.select}
                  selectedValue={service}
                  minWidth="95%"
                  accessibilityLabel="Choose Service"
                  placeholder="Loại Thẻ"
                  _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  defaultValue={service}
                  onValueChange={(itemValue) => setService(itemValue)}
              >
                  <Select.Item label="Viettel" value={VIETTEL} />
                  <Select.Item label="Vinaphone" value={VINAPHONE} />
                  <Select.Item label="Mobifone" value={MOBIFONE} />
                  <Select.Item label="VietnamMobile	" value={VIETNAMMOBILE} />
              </Select>
            </VStack>
            <VStack alignItems="center" space={4}>
            <Select
                style={styles.select}
                selectedValue={price}
                minWidth="95%"
                accessibilityLabel="Choose Service"
                placeholder="Mệnh Giá"
                _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setPrice(itemValue)}
            >
                <Select.Item label="10.000 VNĐ" value="10000" />
                <Select.Item label="20.000 VNĐ" value="20000" />
                <Select.Item label="50.000 VNĐ" value="50000" />
                <Select.Item label="100.000 VNĐ	" value="100000" />
                <Select.Item label="200.000 VNĐ	" value="200000" />
                <Select.Item label="500.000 VNĐ	" value="500000" />
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
                <Input 
                  variant="outline" 
                  placeholder="Seri" 
                  keyboardType="numeric" 
                  style={styles.input} 
                  maxLength={(service === VIETTEL || service === VINAPHONE) ? 14 : ( (service === VIETNAMMOBILE) ? 11 : ( (service === MOBIFONE) ? 15 : null ))}
                  onChangeText={onSerialChange}
                  />
                <Input 
                  variant="outline" 
                  placeholder="Mã Thẻ" 
                  keyboardType="numeric"
                  style={styles.input}
                  maxLength={(service === VIETTEL) ? 15 : ( (service === VINAPHONE) ? 14 : ( (service === MOBIFONE || service === VIETNAMMOBILE) ? 12 : null ))}
                  onChangeText={onCardCodeChange}
                  />
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
          <Button 
            size="lg" 
            bg="lime.500" 
            isLoading={loading}
            onPress={onSubmit}>
              Nạp Thẻ 
          </Button>
        </Stack>
        </View>
        </TouchableWithoutFeedback>
        <Text style={styles.headtable}>Lịch sử nạp thẻ</Text>
     <History></History>
        
        </ScrollView>
        {/* Alert */}
        <Box w="100%">
        <Collapse isOpen={showAlert}>
        <Alert w="100%" status="error">
          <VStack space={1} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  _dark={{
                    color: "coolGray.800",
                  }}
                >
                  Vui lòng nhập đúng thông tin!
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" color="coolGray.600" />}
                onPress={() => setShowAlert(false)}
              />
            </HStack>
            <Box
              pl="6"
              _dark={{
                _text: {
                  color: "coolGray.600",
                },
              }}
            >
              Độ dài số seri hoặc số thẻ bạn vừa nhập không hợp lệ.
            </Box>
          </VStack>
        </Alert>
        </Collapse>
    </Box>
    <Box w="100%">
        <Collapse isOpen={showAlert1} >
        <Alert w="100%" status="success">
            <Box
              pl="6"
              _dark={{
                _text: {
                  color: "coolGray.600",
                },
              }}
            >
              Nạp thẻ thành công
            </Box>
            <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" color="coolGray.600" />}
                onPress={() => setShowAlert1(false)}
              />
        </Alert>
        </Collapse>
    </Box>
    
      </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fdba74"
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
  select:{
    height:40,
    backgroundColor:"#d9f99d",
    paddingHorizontal:10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize:20,   
  },
  input:{
    height:40,
    fontSize:20,
    backgroundColor:"#d9f99d",
  },
  headtable:{
    fontSize:25,
    textAlign:"center",
  }
});
export default TopUp;