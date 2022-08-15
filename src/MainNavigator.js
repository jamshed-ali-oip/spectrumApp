import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BeforeLoginNavigator from './BeforeLoginNavigator';
import AfterLoginNavigator from './AfterLoginNavigator';
import {connect} from 'react-redux';

const MainNavigator = ({userReducer}) => {
  const IS_LOGIN = userReducer?.isLogin;
  const ACCESS_TOKEN = userReducer?.accessToken;

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

export default connect(mapStateToProps, null)(MainNavigator);
