import { StyleSheet, Text, View, SafeAreaView, Platform, Dimensions, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BeforeLoginNavigator from './BeforeLoginNavigator';
import AfterLoginNavigator from './AfterLoginNavigator';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import * as actions from "./store/actions/index"
const { width, height } = Dimensions.get('window');


const MainNavigator = ({ userReducer, getLoginImg }) => {
  const IS_LOGIN = userReducer?.isLogin;
  const ACCESS_TOKEN = userReducer?.accessToken;
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getLoginImg().then(() => setLoading(false)).catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <ImageBackground
      source={require('./assets/images/bg.jpg')}
      style={styles.container}
      >
        <LottieView
          speed={1}
          style={styles.lottieStyle}
          autoPlay
          loop
          source={require('./assets/lottie/color-loader.json')}
        />
      </ImageBackground>
    )
  }
  return (
    <NavigationContainer theme={{ colors: "black" }}>
      {ACCESS_TOKEN ? <AfterLoginNavigator /> : <BeforeLoginNavigator />}
    </NavigationContainer>
  );
};

const mapStateToProps = ({ userReducer }) => {
  return {
    userReducer,
  };
};
const styles = StyleSheet.create({

  lottieStyle: {
    height: Platform?.OS === 'ios' ? height * 0.33 : height * 0.38,
    marginTop: height * 0.098,
    marginLeft: Platform?.OS === 'ios' ? width * 0.05 : width * 0.07,
  },
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
})

export default connect(mapStateToProps, actions)(MainNavigator);
