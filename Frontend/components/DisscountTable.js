import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

export default class DisscountTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Mệnh Giá",'Viettel', 'Mobiphone', 'Vinaphone'],
      tableTitle: ['10000 VND', '20000 VND', '50000 VND', '100000 VND',"200000 VND","500000 VND"],
      tableData: [
        ['85', '80', '80'],
        ['85', '80', '80'],
        ['85', '80', '80'],
        ['86', '81', '81'],
        ['86', '81', '81'],
        ['83', '78', '78'],
      ]
    }
  }
  render(){
    const state = this.state;
  return(
      <View style={styles.container}>
        <Text style={styles.headerTable}>Bảng Chiết Khấu</Text>
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
            <Rows data={state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
      </View>
  );
  }
}
const styles = StyleSheet.create({
    container: {
      width:"100%",
    },
    headerTable:{fontSize:30,textAlign: 'center',fontWeight: "bold",marginBottom:20},
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' ,backgroundColor:"antiquewhite",},
    title: {  backgroundColor: '#f6f8fa' },
    row: {  height: 28  },
    text: { textAlign: 'center' ,fontWeight: "bold"}
}
);