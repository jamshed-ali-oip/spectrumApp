import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BeforeLoginNavigator from './BeforeLoginNavigator';
import AfterLoginNavigator from './AfterLoginNavigator';
import {connect} from 'react-redux';
import * as actions from "./store/actions/index"
const MainNavigator = ({userReducer,getLoginImg}) => {
  const IS_LOGIN = userReducer?.isLogin;
  const ACCESS_TOKEN = userReducer?.accessToken;

  useEffect(()=>{
    getLoginImg()
  },[])

  return (
    <NavigationContainer theme={{colors:"black"}}>
      {ACCESS_TOKEN ? <AfterLoginNavigator /> : <BeforeLoginNavigator />}
    </NavigationContainer>
  );
};

const mapStateToProps = ({userReducer}) => {
  return {
    userReducer,
  };
};

export default connect(mapStateToProps, actions)(MainNavigator);
