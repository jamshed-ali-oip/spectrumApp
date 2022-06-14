import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import {
  themeDarkBlue,
  themeFerozi,
  themeLightBlue,
  themePurple,
} from '../assets/colors/colors';
import {template} from '@babel/core';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor={themeDarkBlue} />
      <ImageBackground
        source={require('../assets/images/bg.jpg')}
        style={styles.container}>
        <Image
        resizeMode='contain'
          source={require('../assets/images/logo.png')}
          style={{
            marginTop: height * 0.15,
            marginBottom: height * 0.05,
            width: width * 0.4,
            height: height * 0.2,
            alignSelf: 'center',
          }}
        />

        <Button
          title={'ASSESSMENTS'}
          btnStyle={{
            backgroundColor: themeFerozi,
            height: height * 0.1,
            alignSelf: 'center',
            marginVertical: height * 0.03,
          }}
          onBtnPress={() => navigation.navigate('assessments')}
          btnTextStyle={{color: 'white', fontSize: width * 0.045}}
          isBgColor={false}
        />

        <Button
          title={'PARTICIPANTS'}
          btnStyle={{
            backgroundColor: themeLightBlue,
            height: height * 0.1,
            alignSelf: 'center',
            marginVertical: height * 0.03,
          }}
          onBtnPress={() => navigation.navigate('participants')}
          btnTextStyle={{color: 'white', fontSize: width * 0.045}}
          isBgColor={false}
        />

        <Button
          title={'RUN AN ASSESSMENTS'}
          btnStyle={{
            backgroundColor: themePurple,
            height: height * 0.1,
            alignSelf: 'center',
            marginVertical: height * 0.03,
          }}
          onBtnPress={() => {
            // navigation.navigate('runAssessment');
          }}
          btnTextStyle={{color: 'white', fontSize: width * 0.045}}
          isBgColor={false}
        />
      </ImageBackground>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
