import React, { useState, useContext,  } from 'react';
import { StyleSheet, Text, View ,ScrollView} from "react-native";
import { Table, Row } from 'react-native-table-component';
import { httpClient } from '../components/customHooks/httpClient';
import MainContext from '../components/Context/MainContext';


const History =()=>{
    
     const tableHead = ['Seri','Thời gian', 'Mệnh giá',"Nhà Mạng", 'Trạng thái'];
     const widthArr= [150, 100, 100, 100, 100];
     const { APIKEY, ACCOUNT, token } = useContext(MainContext);
     const [tableDataSever,setTableData]= useState([]);
     const tableData=[];
    
    httpClient.get(`https://card-exchange.herokuapp.com/api/v1/input-card/all`, token)
      .then(response => {
        
        setTableData(response.data);
      })
      .catch(error => {
        console.log("error ", error.response)
      })
      for (let i=0;i<tableDataSever.length;i++)
      {
        tableData.push(Object.values( tableDataSever[i]))
      }
    return (
      <View style={styles.container}>
       <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </View>
        </ScrollView>
      </View>
    )
}

 
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});
export default History;