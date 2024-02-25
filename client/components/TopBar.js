import {StatusBar, View,  Text, StyleSheet, Image, } from "react-native";
import { Appbar } from 'react-native-paper';

const TopBar = () => (
    <Appbar.Header style={{backgroundColor:'#16C1C8', width:'100%', height:50, margin:0,justifyContent: 'center',}}>
      <Appbar.Content title={
                   <Image source={require("../../assets/logo.png")}
                            style={{
                                marginBottom:20,
                                width: 70,
                                height: 60,
                            }}
                    />
                   } />
    </Appbar.Header>
  );
  
  export default TopBar;